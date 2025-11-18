<?php
require_once 'managerCurso.php';

header('Content-Type: application/json');

try {
    // Validar método HTTP
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Método no permitido", 405);
    }

    // Recibir y validar datos
    $json = file_get_contents('php://input');
    if (empty($json)) {
        throw new Exception("Datos JSON no recibidos", 400);
    }
    
    $data = json_decode($json, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("JSON inválido: " . json_last_error_msg(), 400);
    }

    // Validar campos requeridos
    $camposRequeridos = ['id_curso', 'id_participante'];
    foreach ($camposRequeridos as $campo) {
        if (!isset($data[$campo]) || empty($data[$campo])) {
            throw new Exception("Campo requerido faltante: $campo", 400);
        }
    }

    $curso = new Curso();
    $success = $curso->agregarParticipante(
        intval($data['id_participante']),
        intval($data['id_curso'])
    );

    echo json_encode([
        'success' => $success,
        'message' => $success ? 'Operación exitosa' : 'Error en la operación'
    ]);

} catch(Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>