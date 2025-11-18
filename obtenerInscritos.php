<?php
require_once 'managerCurso.php';

header('Content-Type: application/json');

try {
    $curso = new Curso();
    $response = $curso->obtenerParticipantesInscritos($_GET['id_curso']);
    echo json_encode($response);
} catch(Exception $e) {
    echo json_encode([]);
}