<?php
require_once 'managerCurso.php';

header('Content-Type: application/json');

try {
    if (!isset($_GET['id'])) {  
        throw new Exception("Parámetro ID requerido");
    }
    
    $id = filter_var($_GET['id'], FILTER_VALIDATE_INT);
    
    if ($id === false || $id < 1) {
        throw new Exception("ID inválido");
    }

    $cursoManager = new Curso();
    $curso = $cursoManager->obtenerCursoPorId($id);

    if (isset($curso['error'])) {
        http_response_code(404);
    }
    
    echo json_encode($curso);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        "error" => $e->getMessage()
    ]);
}
?>