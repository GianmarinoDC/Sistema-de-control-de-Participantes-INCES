<?php
// api_cursos_completos.php
include '../../modelo/conexion.php';

$conexion = new Conexion();
$conn = $conexion->getConexion();

$query = "SELECT 
            id_curso,
            nombre_curso,
            max_participantes,
            num_inscritos
          FROM tb_curso
          WHERE id_curso != 1
          ORDER BY nombre_curso";

$stmt = $conn->prepare($query);
$stmt->execute();

$data = [];

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $data[] = [
        'id_curso' => $row['id_curso'],
        'nombre_curso' => $row['nombre_curso'],
        'max_participantes' => (int)$row['max_participantes'],
        'num_inscritos' => (int)$row['num_inscritos']
    ];
}

header('Content-Type: application/json');
echo json_encode($data);
?>
