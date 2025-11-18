<?php
// Incluir el archivo con la clase Docente
require_once 'managerDocente.php';

// Asegurar salida en formato JSON
header('Content-Type: application/json');

try {
    $docenteManager = new Docente(); // Instancia de la clase Docente
    $participantes = $docenteManager->obtenerDocentes(); // Llamada al método
    echo json_encode($participantes);
} catch (Exception $e) {
    error_log("Error en getDocentes.php: " . $e->getMessage()); // Log en servidor
    echo json_encode(['error' => true, 'message' => 'Error al obtener los Docentes: ' . $e->getMessage()]);
    exit;
}
?>
