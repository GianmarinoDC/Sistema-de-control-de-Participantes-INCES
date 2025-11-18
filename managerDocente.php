<?php
// Conexion a la base de datos
require_once '../../modelo/conexion.php';

class docente {
    private $conn;

    public function __construct() {
        $conexion = new Conexion();
        $this->conn = $conexion->getConexion();
    }



    public function verificarCedula($cedula) {
        $stmt = $this->conn->prepare("SELECT COUNT(*) FROM tb_docente WHERE cedula = ?");
        $stmt->execute([$cedula]);
        return $stmt->fetchColumn() > 0;
    }

    public function verificarCedulaEditar($cedula, $idDocente) {
        $stmt = $this->conn->prepare(
            "SELECT COUNT(*) 
            FROM tb_docente 
            WHERE cedula = ? 
            AND id_docente != ?"
        );
        $stmt->execute([$cedula, $idDocente]);
        return $stmt->fetchColumn() > 0;
    }
    
 // Método para registrar un docente
 public function registrar($data) {
    try {
        // Calcular la edad a partir de la fecha de nacimiento
        $fechaNacimiento = new DateTime($data['fechaNacimiento']);
        $hoy = new DateTime();
        $edad = $hoy->diff($fechaNacimiento)->y; // Diferencia en años

        $sql = "INSERT INTO tb_docente (nombre, apellido, cedula, telefono, correo, fecha_nacimiento, edad, estado_docente, genero) 
                VALUES (:nombre, :apellido, :cedula, :telefono, :correo, :fechaNacimiento, :edad, :estado_docente, :genero)";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            ':nombre' => $data['nombre'],
            ':apellido' => $data['apellido'],
            ':cedula' => $data['cedula'],
            ':telefono' => $data['telefono'],
            ':correo' => $data['correo'],
            ':fechaNacimiento' => $data['fechaNacimiento'],
            ':edad' => $edad,
            ':estado_docente' => $data['estado_docente'],
            ':genero' => $data['genero'],
        ]);

        return [
            "success" => true,
            "message" => "Docente registrado con éxito"
        ];
    } catch (PDOException $e) {
        return [
            "success" => false,
            "message" => "Error al registrar Docente: " . $e->getMessage()
        ];
    }
}

    public function existeCedula($cedula) {
        $sql = "SELECT COUNT(*) as total FROM tb_docente WHERE cedula = :cedula";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':cedula', $cedula, PDO::PARAM_STR);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['total'] > 0;
    }


    
    public function eliminar($id) {
        try {
            // Primero verificar si el docente tiene cursos asignados
            $sqlVerificar = "SELECT COUNT(*) FROM tb_docente_curso WHERE id_docente = :id";
            $stmtVerificar = $this->conn->prepare($sqlVerificar);
            $stmtVerificar->bindParam(':id', $id, PDO::PARAM_INT);
            $stmtVerificar->execute();
            
            $tieneCursos = $stmtVerificar->fetchColumn();
            
            if ($tieneCursos > 0) {
                return [
                    "success" => false,
                    "message" => "No se puede eliminar el docente porque tiene cursos asignados"
                ];
            }
    
            // Si no tiene cursos asignados, proceder con la eliminación
            $sql = "DELETE FROM tb_docente WHERE id_docente = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
    
            if ($stmt->rowCount() > 0) {
                return [
                    "success" => true,
                    "message" => "Docente eliminado con éxito"
                ];
            } else {
                return [
                    "success" => false,
                    "message" => "No se encontró el Docente con ID: " . $id
                ];
            }
        } catch (PDOException $e) {
            return [
                "success" => false,
                "message" => "Error en la consulta: " . $e->getMessage()
            ];
        }
    }
    
// Método para editar un docente
public function editar($data) {
    try {
        // Calcular la edad
        $fechaNacimiento = new DateTime($data['fechaNacimiento']);
        $hoy = new DateTime();
        $edad = $hoy->diff($fechaNacimiento)->y;

        // Actualizar docente
        $sql = "UPDATE tb_docente 
                SET nombre = :nombre, apellido = :apellido, cedula = :cedula, 
                    telefono = :telefono, correo = :correo, fecha_nacimiento = :fechaNacimiento, 
                    edad = :edad, estado_docente = :estado_docente, genero = :genero
                WHERE id_docente = :id_docente";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            ':id_docente' => $data['id_docente'],
            ':nombre' => $data['nombre'],
            ':apellido' => $data['apellido'],
            ':cedula' => $data['cedula'],
            ':telefono' => $data['telefono'],
            ':correo' => $data['correo'],
            ':fechaNacimiento' => $data['fechaNacimiento'],
            ':edad' => $edad,
            ':estado_docente' => $data['estado_docente'],
            ':genero' => $data['id_genero'], // Cambiar por 'id_genero'
        ]);

        if ($stmt->rowCount() > 0) {
            return [
                'success' => true,
                'message' => 'Datos actualizados correctamente.'
            ];
        } else {
            return [
                'success' => false,
                'message' => 'No se actualizaron los datos.'
            ];
        }
    } catch (PDOException $e) {
        return [
            'success' => false,
            'message' => 'Error al actualizar los datos: ' . $e->getMessage()
        ];
    }
}


public function obtenerDocentes() {
    $sql = "SELECT id_docente, nombre, apellido, cedula, telefono, correo, fecha_nacimiento, edad, 
                   estado_docente AS estado, genero
            FROM tb_docente";

    $stmt = $this->conn->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

public function obtenerEstadoDocente($id_docente) {
    try {
        $sql = "SELECT estado_docente FROM tb_docente WHERE id_docente = :id_docente";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([':id_docente' => $id_docente]);

        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['estado_docente'] ?? 'Disponible'; // Valor predeterminado si no se encuentra
    } catch (PDOException $e) {
        throw new Exception('Error al obtener el estado actual del docente: ' . $e->getMessage());
    }
}

// Método para obtener los datos de un docente por ID
public function obtenerDocentePorId($id) {
    $sql = "SELECT id_docente, nombre, apellido, cedula, telefono, correo, 
                   DATE_FORMAT(fecha_nacimiento, '%Y-%m-%d') as fecha_nacimiento, 
                   edad, estado_docente, genero
            FROM tb_docente
            WHERE id_docente = :id";

    try {
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $docente = $stmt->fetch(PDO::FETCH_ASSOC);

        return $docente ?: null; // Retorna null si no se encuentra
    } catch (PDOException $e) {
        throw new Exception("Error en la base de datos: " . $e->getMessage());
    }
}

// Método para obtener un docente por ID 
public function verDocente($id) {
    try {
        // Obtener datos básicos del docente
        $sql = "SELECT * FROM tb_docente WHERE id_docente = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        $docente = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($docente) {
            // Obtener cursos asociados con nombre y estado
            $sqlCursos = "
                SELECT 
                    c.nombre_curso AS nombre, 
                    ec.nombre_estatusCurso AS estado
                FROM tb_docente_curso dc
                INNER JOIN tb_curso c ON dc.id_curso = c.id_curso
                LEFT JOIN tb_estatuscurso ec ON c.id_estatusCurso = ec.id_estatusCurso
                WHERE dc.id_docente = :id
            ";

            $stmtCursos = $this->conn->prepare($sqlCursos);
            $stmtCursos->bindParam(':id', $id, PDO::PARAM_INT);
            $stmtCursos->execute();
            $cursos = $stmtCursos->fetchAll(PDO::FETCH_ASSOC);

            return [
                'success' => true,
                'data' => [
                    'nombre' => $docente['nombre'],
                    'apellido' => $docente['apellido'],
                    'cedula' => $docente['cedula'],
                    'telefono' => $docente['telefono'],
                    'edad' => $docente['edad'],
                    'fechaNacimiento' => $docente['fecha_nacimiento'],
                    'genero' => $docente['genero'],
                    'estado' => $docente['estado_docente'],
                    'correo' => $docente['correo'],
                    'cursos' => $cursos
                ]
            ];
        } else {
            return [
                'success' => false,
                'message' => 'Docente no encontrado'
            ];
        }
    } catch (PDOException $e) {
        return [
            'success' => false,
            'message' => 'Error al obtener los datos: ' . $e->getMessage()
        ];
    }
}


}
?>