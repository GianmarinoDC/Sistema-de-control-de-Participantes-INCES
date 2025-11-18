<?php
// Conexion a la base de datos
require_once '../../modelo/conexion.php';

// Verificar si la solicitud es de tipo POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener datos del formulario
    $participanteId = $_POST['participante_id'] ?? null;
    $cursoId = $_POST['curso_id'] ?? null;

    // Verificar que los datos no estén vacíos
    if ($participanteId && $cursoId) {
        try {
            // Crear una instancia de la conexión y obtener la conexión PDO
            $conexion = new Conexion();
            $conn = $conexion->getConexion();

            // Verificar si el curso seleccionado es distinto a 1
            if ($cursoId != 1) {
                $idEstado = 2;
            } else {
                $idEstado = 1; // Ajusta este valor según lo que requieras
            }

            // 1. Primero, actualizamos a NULL el campo id_docente en tb_curso para todos los cursos donde el docente está asignado
            $stmtUpdateAllDocentes = $conn->prepare("UPDATE tb_curso SET id_docente = NULL WHERE id_docente = :participante_id");
            $stmtUpdateAllDocentes->bindParam(':participante_id', $participanteId, PDO::PARAM_INT);
            $stmtUpdateAllDocentes->execute();

            // 2. Si el curso es 1, buscar el docente asignado a ese curso
            if ($cursoId == 1) {
                // Buscar el id_docente asignado al curso (con el cursoId enviado)
                $stmtCurso = $conn->prepare("SELECT id_docente FROM tb_curso WHERE id_curso = :curso_id");
                $stmtCurso->bindParam(':curso_id', $cursoId, PDO::PARAM_INT);
                $stmtCurso->execute();
                $curso = $stmtCurso->fetch(PDO::FETCH_ASSOC);

                // Si el docente está asignado, actualizamos el campo `id_docente` en `tb_curso` a NULL en el curso donde estaba asignado
                if ($curso && $curso['id_docente'] != NULL) {
                    $stmtUpdateCurso = $conn->prepare("UPDATE tb_curso SET id_docente = NULL WHERE id_curso = :curso_id");
                    $stmtUpdateCurso->bindParam(':curso_id', $cursoId, PDO::PARAM_INT);
                    $stmtUpdateCurso->execute();
                }
            }

            // 3. Si el curso no es 1, actualizamos la tabla `tb_curso` con el `id_docente` del docente
            if ($cursoId != 1) {
                $stmtCursoUpdate = $conn->prepare("UPDATE tb_curso SET id_docente = :participante_id WHERE id_curso = :curso_id");
                $stmtCursoUpdate->bindParam(':participante_id', $participanteId, PDO::PARAM_INT);
                $stmtCursoUpdate->bindParam(':curso_id', $cursoId, PDO::PARAM_INT);
                $stmtCursoUpdate->execute();
            }

            // 4. Actualizar la tabla `tb_docente` con el resto de la información del docente
            $stmtDocente = $conn->prepare("UPDATE tb_docente SET id_estadoDocente = :id_estadoDocente WHERE id_docente = :participante_id");
            $stmtDocente->bindParam(':id_estadoDocente', $idEstado, PDO::PARAM_INT);
            $stmtDocente->bindParam(':participante_id', $participanteId, PDO::PARAM_INT);
            $stmtDocente->execute();


        } catch (PDOException $e) {
            // Enviar error en formato JSON
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
    } else {
        // Enviar error por falta de datos en formato JSON
        echo json_encode(["status" => "error", "message" => "Datos incompletos."]);
    }
} else {

}
?>
