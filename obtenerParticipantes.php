<?php
require_once 'managerCurso.php';
header('Content-Type: application/json');

if (!isset($_GET['id_curso'])) {
    echo json_encode(['error' => 'Falta el parámetro id_curso']);
    exit;
}

$id_curso = filter_input(INPUT_GET, 'id_curso', FILTER_VALIDATE_INT);
if (!$id_curso) {
    echo json_encode(['error' => 'ID de curso inválido']);
    exit;
}

$model = new Curso();

// Obtener todos los participantes
$participantes = $model->obtenerParticipantesPorCurso($id_curso);

// Obtener el ID del estatus del curso (de tb_curso.id_estatusCurso)
$estatusCursoId = $model->obtenerIdEstatusCurso($id_curso);

echo json_encode([
    'participantes' => $participantes,
    'id_estatus' => $estatusCursoId // por ejemplo, 3 = Culminado
]);
exit;
