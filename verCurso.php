<?php
require_once 'managerCurso.php';

header('Content-Type: application/json');

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);

    $cursoManager = new Curso();
    $resultado = $cursoManager->verCurso($id);

    echo json_encode($resultado);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'ID no proporcionado'
    ]);
}
?>
