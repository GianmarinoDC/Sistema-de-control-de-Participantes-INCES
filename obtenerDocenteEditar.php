<?php
require_once 'managerDocente.php';

header('Content-Type: application/json');

if (isset($_GET['id'])) {
    $id = intval($_GET['id']); // Sanitizar el ID

    try {
        $docenteManager = new Docente();
        $docente = $docenteManager->obtenerDocentePorId($id);

        if ($docente) {
            echo json_encode($docente); // Enviar los datos en formato JSON
        } else {
            echo json_encode(['error' => 'Docente no encontrado']);
        }
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'ID no proporcionado']);
}
