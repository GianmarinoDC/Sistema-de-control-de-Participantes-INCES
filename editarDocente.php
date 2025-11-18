<?php
require_once 'managerDocente.php';

header('Content-Type: application/json');
ini_set('display_errors', 0);
ini_set('log_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = [
        'id_docente' => intval($_POST['id_docente']),
        'nombre' => $_POST['nombre'] ?? null,
        'apellido' => $_POST['apellido'] ?? null,
        'cedula' => $_POST['cedula'] ?? null,
        'telefono' => $_POST['telefono'] ?? null,
        'id_genero' => $_POST['id_genero'] ?? null,
        'correo' => $_POST['correo'] ?? null,
        'fechaNacimiento' => $_POST['fechaNacimiento'] ?? null,
        'estado_docente' => $_POST['estado_docente'] ?? null,
    ];

    foreach ($data as $key => $value) {
        if (empty($value) && $key !== 'estado_docente') {
            echo json_encode(['success' => false, 'message' => "El campo $key es obligatorio."]);
            exit;
        }
    }

    try {
        $docente = new docente();

        if ($data['estado_docente'] === null || !in_array($data['estado_docente'], ['Disponible', 'En formación'])) {
            $data['estado_docente'] = $docente->obtenerEstadoDocente($data['id_docente']);
        }

        $response = $docente->editar($data);
        echo json_encode($response);
        exit;
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error interno: ' . $e->getMessage()]);
        exit;
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método HTTP no permitido.']);
    exit;
}
