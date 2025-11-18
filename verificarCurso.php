<?php
require_once 'managerCurso.php';

if (isset($_GET['nombre_curso'])) {
    $curso = new Curso(); // Asegúrate de que el nombre de tu clase sea correcto
    $nombre_curso = $_GET['nombre_curso'];
    
    echo json_encode(["exists" => $curso->verificarNombreCurso($nombre_curso)]);
}
?>