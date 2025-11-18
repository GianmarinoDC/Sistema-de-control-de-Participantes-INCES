<?php
require_once 'managerCurso.php';

// Asegurar salida en formato JSON
header('Content-Type: application/json');

try {
    $curso = new Curso();

    // Obtener los cursos con relaciones
    $resultado = $curso->obtenerCursos();

    if (!$resultado || !is_array($resultado)) {
        echo json_encode([
            "success" => false,
            "message" => "No se encontraron cursos registrados o error al procesar los datos."
        ]);
    } else {
        echo json_encode($resultado);
    }
} catch (Exception $e) {
    error_log("Error en obtenerCursos.php: " . $e->getMessage()); // Log para depuración en el servidor
    echo json_encode([
        "success" => false,
        "message" => "Error inesperado: " . $e->getMessage()
    ]);
}
?>
