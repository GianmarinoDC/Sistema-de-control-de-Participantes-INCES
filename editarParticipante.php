<?php
require_once '../modelo/conexion.php';
require_once 'managerParticipante.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Validar campos requeridos
        $requiredFields = [
            'id_participante', 'nombre', 'apellido', 'cedula',
            'genero', 'correo', 'fechaNacimiento',
            'grado_institucion'
        ];
        
        $missingFields = [];
        foreach ($requiredFields as $field) {
            if (empty($_POST[$field])) {
                $missingFields[] = $field;
            }
        }
        
        if (!empty($missingFields)) {
            throw new Exception("Faltan campos requeridos: " . implode(', ', $missingFields));
        }

        // Validar opciones permitidas
        $generosPermitidos = ['Masculino', 'Femenino'];
        $gradosPermitidos = ['Primaria', 'Bachillerato', 'Universidad'];
        
        if (!in_array($_POST['genero'], $generosPermitidos)) {
            throw new Exception("Género no válido");
        }
        
        if (!in_array($_POST['grado_institucion'], $gradosPermitidos)) {
            throw new Exception("Grado de instrucción no válido");
        }

        // Preparar datos
        $data = [
            'id_participante' => $_POST['id_participante'],
            'nombre' => $_POST['nombre'],
            'apellido' => $_POST['apellido'],
            'cedula' => $_POST['cedula'],
            'telefono' => $_POST['telefono'] ?? null,
            'correo' => $_POST['correo'],
            'fechaNacimiento' => $_POST['fechaNacimiento'],
            'grado_institucion' => $_POST['grado_institucion'],
            'genero' => $_POST['genero']
        ];

        // Actualizar en base de datos
        $dao = new Participante();
        $resultado = $dao->actualizarParticipante($data);

        if ($resultado) {
            echo json_encode([
                'success' => true,
                'message' => 'Datos actualizados correctamente'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'No se realizaron cambios en el registro'
            ]);
        }
        
    } catch (PDOException $e) {
        $mensaje = ($e->errorInfo[1] == 1062) 
                 ? 'La cédula ya está registrada en otro participante' 
                 : 'Error de base de datos: ' . $e->getMessage();
        
        echo json_encode([
            'success' => false,
            'message' => $mensaje
        ]);
        
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Método no permitido. Se requiere POST'
    ]);
}
?>