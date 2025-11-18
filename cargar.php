<?php
require_once '../controlador/managerParticipante.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = [
            'nombre' => $_POST['nombre'] ?? '',
            'apellido' => $_POST['apellido'] ?? '',
            'cedula' => $_POST['cedula'] ?? '',
            'correo' => $_POST['correo'] ?? '',
            'telefono' => $_POST['telefono'] ?? '',
            'fecha_nacimiento' => $_POST['fechaNacimiento'] ?? '',
            'estado' => $_POST['id_estado'] ?? 'En sistema',
            'grado_institucion' => $_POST['id_gradoInstitucion'] ?? '',
            'genero' => $_POST['id_genero'] ?? '',
            'id_curso' => $_POST['id_curso'] ?? null // Obtener el id_curso
        ];

        // Validación de campos requeridos
        $camposRequeridos = ['nombre', 'apellido', 'cedula', 'genero'];
        foreach ($camposRequeridos as $campo) {
            if (empty($data[$campo])) {
                throw new Exception("El campo $campo es obligatorio.");
            }
        }

        $participante = new Participante();
        $response = $participante->registrar($data);
        echo json_encode($response);

    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Error: ' . $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Método no permitido.'
    ]);
}
?>