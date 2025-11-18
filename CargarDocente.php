<?php
// Incluir la clase Docente
require_once 'managerDocente.php';

header('Content-Type: application/json');

// Verificar que la solicitud sea POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recibir los datos enviados por el cliente
    $data = [
        'nombre' => $_POST['nombre'] ?? null,
        'apellido' => $_POST['apellido'] ?? null,
        'cedula' => $_POST['cedula'] ?? null,
        'telefono' => $_POST['telefono'] ?? null,
        'correo' => $_POST['correo'] ?? null,
        'fechaNacimiento' => $_POST['fechaNacimiento'] ?? null,
        'estado_docente' => $_POST['estado_docente'] ?? 'Disponible',
        'genero' => $_POST['genero'] ?? 'Masculino', // Valor predeterminado
    ];

    // Validar datos requeridos
    foreach ($data as $key => $value) {
        if ($value === null || $value === '') {
            echo json_encode([
                'success' => false,
                'message' => "El campo $key es obligatorio."
            ]);
            exit;
        }
    }

    try {
        // Instanciar la clase y llamar al método editar
        $docenteManager = new Docente();
        $response = $docenteManager->registrar($data);

        // Responder en formato JSON
        echo json_encode($response);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error interno: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Método HTTP no permitido.'
    ]);
}
