<?php
require_once '../../modelo/conexion.php';

$añoActual = date('Y');

// Crear una instancia de la conexión
$conexion = new Conexion();
$pdo = $conexion->getConexion();

// Consulta para contar inscritos por curso en el año actual
$sql = "
    SELECT c.nombre_curso, COUNT(*) AS total_inscritos
    FROM tb_participante_curso pc
    JOIN tb_curso c ON pc.id_curso = c.id_curso
    WHERE YEAR(pc.fecha_inscripcion) = ?
    GROUP BY pc.id_curso
    ORDER BY total_inscritos DESC
";

$stmt = $pdo->prepare($sql);
$stmt->execute([$añoActual]);
$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Retornar en formato JSON
echo json_encode($resultado);
?>
