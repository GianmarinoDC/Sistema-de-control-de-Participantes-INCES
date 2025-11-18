<?php
require_once '../../modelo/conexion.php';
require_once 'managerCurso.php';

header('Content-Type: application/json');

// Sanitización
function sanitize($v) {
    return htmlspecialchars(strip_tags(trim($v)), ENT_QUOTES, 'UTF-8');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['success'=>false,'message'=>'Método no permitido']));
}

try {
    // Recoger y sanear
    $post = array_map('sanitize', $_POST);
    
    // Validar requeridos
    foreach (['nombre_curso','fecha_inicio','fecha_fin','turno','id_docente'] as $f) {
        if (empty($post[$f])) {
            throw new Exception("El campo $f es obligatorio");
        }
    }
    // Fechas
    if (strtotime($post['fecha_inicio']) > strtotime($post['fecha_fin'])) {
        throw new Exception("Fecha inicio > fecha fin");
    }

    // Registrar curso
    $cursoMgr = new Curso();
    $resCurso = $cursoMgr->registrar([
        'nombre_curso'      => $post['nombre_curso'],
        'fecha_inicio'      => $post['fecha_inicio'],
        'fecha_fin'         => $post['fecha_fin'],
        'max_participantes' => $post['max_participantes'] ?? 30,
        'id_modalidad'      => $post['id_modalidad'] ?? null,
        'tipo_formacion'    => $post['tipo_formacion'] ?? null,
        'id_estatusCurso'   => $post['id_estatusCurso'] ?? 1,
        'sectoreconomico'   => $post['sectoreconomico'] ?? null,
        'id_motor'          => $post['id_motor'] ?? null,
        'subtipo'           => $post['subtipo'] ?? null,
        'id_areaFormativa'  => $post['id_areaFormativa'] ?? null,
        'ambito'            => $post['ambito'] ?? null,
        'turno'             => $post['turno'],
        'programa_formacion'=> $post['programa_formacion'] ?? null
    ]);

    if (!$resCurso['success']) {
        throw new Exception($resCurso['message']);
    }

    $nuevoIdCurso = $resCurso['id_curso'];
    // Asignar docente
    $idDocente = intval($post['id_docente']);
    $cursoMgr->asignarDocenteCurso($nuevoIdCurso, $idDocente);
    $cursoMgr->actualizarEstadoDocente($idDocente);

    echo json_encode([
        'success'   => true,
        'message'   => 'Curso y docente registrados correctamente',
        'id_curso'  => $nuevoIdCurso
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
