<?php
require_once 'managerDocente.php';

header('Content-Type: application/json');

try {
    $cedula = $_GET['cedula'] ?? '';
    $idDocente = $_GET['idDocente'] ?? 0;

    $manager = new docente();
    $existe = $manager->verificarCedulaEditar($cedula, $idDocente);
    
    echo json_encode(['existe' => $existe]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>