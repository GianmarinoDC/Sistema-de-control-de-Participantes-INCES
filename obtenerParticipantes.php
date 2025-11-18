<?php
// obtenerParticipante.php
require_once '../modelo/conexion.php';
require_once 'managerParticipante.php'; // Asegúrate de que esta ruta sea correcta

$participante = new Participante();

try {
    $participantes = $participante->obtenerParticipantes();
    if ($participantes) {
        echo json_encode($participantes);
    } else {
        echo json_encode(['error' => true, 'message' => 'No se encontraron participantes']);
    }
} catch (Exception $e) {
    echo json_encode(['error' => true, 'message' => 'Error al obtener participantes: ' . $e->getMessage()]);
}
?>