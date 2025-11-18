<?php
require_once 'managerCurso.php';
header('Content-Type: application/json');

// Recibe los datos del cliente
$data = json_decode(file_get_contents('php://input'), true);

// Verificar que se recibe el ID del curso
$idCurso = isset($data['id_curso']) ? (int)$data['id_curso'] : null;
$participantesNotas = isset($data['participantes_notas']) ? $data['participantes_notas'] : null;

// Verificar que los datos son válidos
if (!$idCurso || !$participantesNotas) {
    echo json_encode(['success' => false, 'error' => 'Datos inválidos']);
    exit;
}

$model = new Curso();

// Actualizar las notas y estados de los participantes
$actualizado = true;
foreach ($participantesNotas as $nota) {
    $idParticipanteCurso = isset($nota['id_participante_curso']) ? (int)$nota['id_participante_curso'] : null;
    $estado = isset($nota['estado']) ? $nota['estado'] : null;
    
    if (!$idParticipanteCurso || !$estado) {
        $actualizado = false;
        break;
    }
    
    // Aquí actualizas el estado del participante en la base de datos
    if (!$model->guardarNotas($idParticipanteCurso, $estado)) {
        $actualizado = false;
        break;
    }
}

// Si se actualizaron las notas, cambiar el estado del curso
if ($actualizado) {
    $model->cambiarEstadoCurso($idCurso, 4);  // 4 es el id de "Aprobado" en la tabla tb_curso
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'No se pudieron guardar todas las notas']);
}
