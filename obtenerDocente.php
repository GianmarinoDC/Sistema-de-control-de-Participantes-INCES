<?php
require_once '../../modelo/conexion.php';

if (isset($_GET['id_docente'])) {
    $id_docente = $_GET['id_docente'];

    try {
        $conexion = new Conexion();
        $conn = $conexion->getConexion();

        // Consultar datos del docente por ID
        $stmt = $conn->prepare("SELECT nombre, apellido, cedula, correo FROM tb_docente WHERE id_docente = ?");
        $stmt->execute([$id_docente]);
        $docente = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($docente) {
            echo json_encode($docente);
        } else {
            echo json_encode(['error' => 'Docente no encontrado']);
        }
    } catch (Exception $e) {
        echo json_encode(['error' => 'Error al obtener docente: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'ID de docente no proporcionado']);
}
