<?php
require_once 'managerCurso.php';

header('Content-Type: application/json');

try {
    // Validar parámetro requerido
    if (!isset($_GET['id_curso'])) {
        throw new InvalidArgumentException("Parámetro id_curso requerido");
    }
    
    $idCurso = $_GET['id_curso'];
    $busqueda = $_GET['busqueda'] ?? '';
    
    $curso = new Curso();
    
    // 1. Verificar estado y capacidad del curso
    $infoCurso = $curso->obtenerInfoCurso($idCurso);
    
    if (!is_array($infoCurso)) {
        throw new Exception("Error al obtener información del curso");
    }
    
    if ($infoCurso['id_estatusCurso'] != 1) {
        throw new Exception("El curso no está disponible para asignaciones");
    }
    
    if ($infoCurso['num_inscritos'] >= $infoCurso['max_participantes']) {
        echo json_encode([
            'error' => 'Cupos completos',
            'cupos_llenos' => true,
            'inscritos' => $infoCurso['num_inscritos'],
            'maximo' => $infoCurso['max_participantes']
        ]);
        exit;
    }

    // 2. Obtener participantes disponibles
    $participantes = $curso->obtenerParticipantesDisponibles($idCurso, $busqueda);
    
    // 3. Formatear respuesta
    if (empty($participantes)) {
        echo json_encode([
            'info' => 'No se encontraron participantes disponibles',
            'busqueda' => $busqueda
        ]);
    } else {
        echo json_encode($participantes);
    }
    
} catch(InvalidArgumentException $e) {
    error_log("Error de validación: " . $e->getMessage());
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
    
} catch(Exception $e) {
    error_log("ERROR obtenerDisponibles: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}