<?php
// controlador/get_participante.php
require_once 'managerParticipante.php';

header('Content-Type: application/json');

try {
    if (!isset($_GET['id'])) {
        throw new Exception('ID no proporcionado');
    }

    $id = intval($_GET['id']);
    $participanteModel = new Participante();
    $datos = $participanteModel->obtenerPorId($id);

    if ($datos) {
        echo json_encode($datos);
    } else {
        echo json_encode(['error' => 'Participante no encontrado']);
    }
    
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>