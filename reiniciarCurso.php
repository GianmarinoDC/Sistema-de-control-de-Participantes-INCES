<?php
require_once '../../modelo/conexion.php';

$data = json_decode(file_get_contents("php://input"), true);

$idCurso = $data['id_curso'] ?? null;
$nuevaInicio = $data['nueva_fecha_inicio'] ?? null;
$nuevaFin = $data['nueva_fecha_fin'] ?? null;

// Validar datos
if (!$idCurso || !$nuevaInicio || !$nuevaFin) {
    echo json_encode(['success' => false, 'error' => 'Datos incompletos.']);
    exit;
}

// Validar formato de fechas
$fechaInicio = DateTime::createFromFormat('Y-m-d', $nuevaInicio);
$fechaFin = DateTime::createFromFormat('Y-m-d', $nuevaFin);
$minimaFin = (clone $fechaInicio)->modify('+21 days');

if (!$fechaInicio || !$fechaFin) {
    echo json_encode(['success' => false, 'error' => 'Formato de fechas inválido.']);
    exit;
}

if ($fechaFin <= $fechaInicio) {
    echo json_encode(['success' => false, 'error' => 'La fecha de fin debe ser posterior a la fecha de inicio.']);
    exit;
}

if ($fechaFin < $minimaFin) {
    echo json_encode(['success' => false, 'error' => 'La duración del curso debe ser de al menos 3 semanas.']);
    exit;
}

try {
    $conexion = new Conexion();
    $conn = $conexion->getConexion();

    if (!$conn) {
        echo json_encode(['success' => false, 'error' => 'Conexión no disponible.']);
        exit;
    }

    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->beginTransaction();

    // Actualizar curso
    $sqlCurso = "UPDATE tb_curso 
                 SET fecha_inicio = ?, fecha_fin = ?, id_estatusCurso = 1, num_inscritos = 0 
                 WHERE id_curso = ?";
    $stmtCurso = $conn->prepare($sqlCurso);
    $stmtCurso->execute([$nuevaInicio, $nuevaFin, $idCurso]);

    $filasAfectadas = $stmtCurso->rowCount();

    if ($filasAfectadas === 0) {
        throw new Exception("No se encontró el curso con ID $idCurso o no se modificó nada.");
    }

    // Obtener participantes del curso
    $sqlParticipantes = "SELECT id_participante FROM tb_participante_curso WHERE id_curso = ?";
    $stmt = $conn->prepare($sqlParticipantes);
    $stmt->execute([$idCurso]);
    $participantes = $stmt->fetchAll(PDO::FETCH_COLUMN);

    foreach ($participantes as $idParticipante) {
        // Consultar otros cursos activos del participante
        $sqlOtrosCursos = "
            SELECT estatus_participante 
            FROM tb_participante_curso pc
            INNER JOIN tb_curso c ON pc.id_curso = c.id_curso
            WHERE pc.id_participante = ?
              AND c.id_curso != ?
              AND pc.estatus_participante IN ('Pendiente', 'En formación')
        ";
        $stmtCheck = $conn->prepare($sqlOtrosCursos);
        $stmtCheck->execute([$idParticipante, $idCurso]);
        $estatuses = $stmtCheck->fetchAll(PDO::FETCH_COLUMN);

        // Decidir nuevo estado
        if (in_array('En formación', $estatuses)) {
            continue; // Sigue en formación, no hacer nada
        } elseif (in_array('Pendiente', $estatuses)) {
            $nuevoEstado = 'Asignado';
        } else {
            $nuevoEstado = 'Inactivo';
        }

        // Actualizar estado en tb_participante
        $sqlEstado = "UPDATE tb_participante SET estado = ? WHERE id_participante = ?";
        $stmtEstado = $conn->prepare($sqlEstado);
        $stmtEstado->execute([$nuevoEstado, $idParticipante]);
    }

    // Obtener docentes del curso
    $sqlDocentes = "SELECT id_docente FROM tb_docente_curso WHERE id_curso = ?";
    $stmtDocente = $conn->prepare($sqlDocentes);
    $stmtDocente->execute([$idCurso]);
    $docentes = $stmtDocente->fetchAll(PDO::FETCH_COLUMN);

    foreach ($docentes as $idDocente) {
        // Buscar cursos del docente con estatus 2 (en proceso)
        $sqlCursosEnProcesoDocente = "
            SELECT COUNT(*)
            FROM tb_docente_curso dc
            INNER JOIN tb_curso c ON dc.id_curso = c.id_curso
            WHERE dc.id_docente = ?
              AND c.id_estatusCurso = 2
        ";
        $stmtCheckDocente = $conn->prepare($sqlCursosEnProcesoDocente);
        $stmtCheckDocente->execute([$idDocente]);
        $cantidadCursosEnProceso = $stmtCheckDocente->fetchColumn();

        // Decidir nuevo estado_docente
        if ($cantidadCursosEnProceso > 0) {
            // Tiene cursos en proceso
            $nuevoEstadoDocente = 'En formación';
        } else {
            // No tiene cursos en proceso
            $nuevoEstadoDocente = 'Asignado';
        }

        // Actualizar estado_docente
        $sqlEstadoDocente = "UPDATE tb_docente SET estado_docente = ? WHERE id_docente = ?";
        $stmtEstadoDocente = $conn->prepare($sqlEstadoDocente);
        $stmtEstadoDocente->execute([$nuevoEstadoDocente, $idDocente]);
    }

    $conn->commit();
    echo json_encode(['success' => true]);

} catch (Exception $e) {
    if ($conn && $conn->inTransaction()) {
        $conn->rollBack();
    }
    $error = 'Error al reiniciar el curso: ' . $e->getMessage();
    echo json_encode(['success' => false, 'error' => $error]);
}
?>
