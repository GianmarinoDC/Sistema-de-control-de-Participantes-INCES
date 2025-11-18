<?php
require_once 'managerCurso.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

try {
    // Mapeo corregido con nombres reales del formulario
    $data = [
        'id_curso' => $_POST['id_curso'] ?? null,
        'nombre_curso-Edit' => $_POST['nombre_curso-Edit'] ?? null,
        'id_modalidad-Edit' => $_POST['id_modalidad-Edit'] ?? null,
        'id_motor-Edit' => $_POST['id_motor-Edit'] ?? null,
        'id_areaFormativa-Edit' => $_POST['id_areaFormativa-Edit'] ?? null,
        'fecha_inicio-Edit' => $_POST['fecha_inicio-Edit'] ?? null,
        'fecha_fin-Edit' => $_POST['fecha_fin-Edit'] ?? null,
        'max_participantes-Edit' => $_POST['max_participantes-Edit'] ?? null,
        'sectoreconomico-Edit' => $_POST['sectoreconomico-Edit'] ?? null,
        'subtipo-Edit' => $_POST['subtipo-Edit'] ?? null,
        'ambito-Edit' => $_POST['ambito-Edit'] ?? null,
        'turno-Edit' => $_POST['turno-Edit'] ?? null,
        'tipo_formacion-Edit' => $_POST['tipo_formacion-Edit'] ?? null,
        'programa_formacion-Edit' => $_POST['programa_formacion-Edit'] ?? null
    ];

    // Validación con nombres reales del formulario
    $requiredFields = [
        'id_curso',
        'nombre_curso-Edit',
        'id_modalidad-Edit',
        'id_motor-Edit',
        'id_areaFormativa-Edit',
        'fecha_inicio-Edit',
        'fecha_fin-Edit',
        'max_participantes-Edit'
    ];

    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => "Campo obligatorio: " . str_replace("-Edit", "", $field)
            ]);
            exit;
        }
    }

    $curso = new Curso();
    $resultado = $curso->editar($data);

    if ($resultado['success']) {
        echo json_encode($resultado);
    } else {
        http_response_code(400);
        echo json_encode($resultado);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error interno: ' . $e->getMessage()
    ]);
}