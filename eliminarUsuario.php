<?php
// llamado al archivo managerUsuario.php 
require_once 'managerUsuario.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'])) {
    $idParticipante = $_POST['id'];

    try {
        // Instanciar la clase y llamar al método eliminar
        $participante = new usuario();
        $response = $participante->eliminar($idParticipante);

        echo json_encode($response);
    } catch (Exception $e) {
        echo json_encode([
            "success" => false,
            "message" => "Error interno: " . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "ID no recibido o método HTTP incorrecto"
    ]);
}
?>
