<?php
// Conexion a la base de datos
require_once '../modelo/conexion.php';

// Clase Participante
class Participante {
    private $conn;

    public function __construct() {
        $conexion = new Conexion();
        $this->conn = $conexion->getConexion();
    }


    // Método para verificar si la cédula ya está registrada
    public function verificarCedula($cedula) {
        $stmt = $this->conn->prepare("SELECT COUNT(*) FROM tb_participante WHERE cedula = ?");
        $stmt->execute([$cedula]);
        return $stmt->fetchColumn() > 0;
    }


// Método para verificar si la cédula ya está registrada excluyendo el ID actual
public function verificarCedulaEditar($cedula, $idParticipante) {
    $stmt = $this->conn->prepare(
        "SELECT COUNT(*) 
        FROM tb_participante 
        WHERE cedula = ? 
        AND id_participante != ?"
    );
    
    $stmt->execute([$cedula, $idParticipante]);
    return $stmt->fetchColumn() > 0;
}



public function registrar($data) {
    $this->conn->beginTransaction();
    try {
        $fechaNacimiento = new DateTime($data['fecha_nacimiento']);
        $edad = (new DateTime())->diff($fechaNacimiento)->y;

        // Insertar participante
        $sqlParticipante = "INSERT INTO tb_participante (
            nombre, apellido, cedula, edad, correo, telefono, 
            fecha_nacimiento, estado, grado_institucion, genero
        ) VALUES (
            :nombre, :apellido, :cedula, :edad, :correo, :telefono, 
            :fecha_nacimiento, :estado, :grado_institucion, :genero
        )";

        $stmt = $this->conn->prepare($sqlParticipante);
        $stmt->execute([
            ':nombre' => $data['nombre'],
            ':apellido' => $data['apellido'],
            ':cedula' => $data['cedula'],
            ':edad' => $edad,
            ':correo' => $data['correo'],
            ':telefono' => $data['telefono'],
            ':fecha_nacimiento' => $data['fecha_nacimiento'],
            ':estado' => $data['estado'],
            ':grado_institucion' => $data['grado_institucion'],
            ':genero' => $data['genero']
        ]);

        $id_participante = $this->conn->lastInsertId();

        // Si el estado es "Asignado", gestionar la inscripción al curso
        if ($data['estado'] === 'Asignado') {
            // Verificar y actualizar cupo del curso
            $sqlUpdateCurso = "UPDATE tb_curso 
                               SET num_inscritos = num_inscritos + 1 
                               WHERE id_curso = :id_curso 
                               AND num_inscritos < max_participantes";
            
            $stmtUpdate = $this->conn->prepare($sqlUpdateCurso);
            $stmtUpdate->execute([':id_curso' => $data['id_curso']]);
            $rowsUpdated = $stmtUpdate->rowCount();

            if ($rowsUpdated === 0) {
                throw new Exception("No hay cupos disponibles en el curso seleccionado.");
            }

            // Obtener fechas de inicio y fin del curso
            $sqlFechasCurso = "SELECT fecha_inicio, fecha_fin 
                               FROM tb_curso 
                               WHERE id_curso = :id_curso";
            $stmtFechas = $this->conn->prepare($sqlFechasCurso);
            $stmtFechas->execute([':id_curso' => $data['id_curso']]);
            $fechasCurso = $stmtFechas->fetch(PDO::FETCH_ASSOC);

            if (!$fechasCurso) {
                throw new Exception("El curso seleccionado no existe.");
            }

            // Insertar en participante_curso con las fechas obtenidas
            $sqlParticipanteCurso = "INSERT INTO tb_participante_curso (
                id_participante, id_curso, fecha_inscripcion, FechaInicio, FechaFin, estatus_participante
            ) VALUES (
                :id_participante, :id_curso, :fecha_inscripcion, :fecha_inicio, :fecha_fin, :estatus_participante
            )";

            $stmtCurso = $this->conn->prepare($sqlParticipanteCurso);
            $stmtCurso->execute([
                ':id_participante' => $id_participante,
                ':id_curso' => $data['id_curso'],
                ':fecha_inscripcion' => date('Y-m-d'),
                ':fecha_inicio' => $fechasCurso['fecha_inicio'],
                ':fecha_fin' => $fechasCurso['fecha_fin'],
                ':estatus_participante' => 'Pendiente'
            ]);
        }

        $this->conn->commit();

        return [
            "success" => true,
            "message" => "Participante registrado con éxito",
            "id" => $id_participante
        ];

    } catch (Exception $e) {
        $this->conn->rollBack();
        return [
            "success" => false,
            "message" => "Error: " . $e->getMessage()
        ];
    }
}


// Método para eliminar un participante
public function eliminar($id) {
    try {
        // Verificar estado del participante
        $sqlCheckEstado = "SELECT estado FROM tb_participante WHERE id_participante = :id";
        $stmtCheckEstado = $this->conn->prepare($sqlCheckEstado);
        $stmtCheckEstado->bindParam(':id', $id, PDO::PARAM_INT);
        $stmtCheckEstado->execute();
        $participante = $stmtCheckEstado->fetch(PDO::FETCH_ASSOC);

        if (!$participante) {
            return [
                "success" => false,
                "message" => "No se encontró el participante."
            ];
        }

        if ($participante['estado'] != 'En sistema') {
            return [
                "success" => false,
                "message" => "¡No se puede eliminar un participante en curso o con registros historicos!."
            ];
        }

        // Verificar inscripciones en cursos
        $sqlCheckCursos = "SELECT COUNT(*) AS count FROM tb_participante_curso WHERE id_participante = :id";
        $stmtCheckCursos = $this->conn->prepare($sqlCheckCursos);
        $stmtCheckCursos->bindParam(':id', $id, PDO::PARAM_INT);
        $stmtCheckCursos->execute();
        $resultCursos = $stmtCheckCursos->fetch(PDO::FETCH_ASSOC);

        if ($resultCursos['count'] > 0) {
            return [
                "success" => false,
                "message" => "No se puede eliminar un participante inscrito en un curso."
            ];
        }

        // Eliminar participante
        $sqlDelete = "DELETE FROM tb_participante WHERE id_participante = :id";
        $stmtDelete = $this->conn->prepare($sqlDelete);
        $stmtDelete->bindParam(':id', $id, PDO::PARAM_INT);
        $stmtDelete->execute();

        if ($stmtDelete->rowCount() > 0) {
            return [
                "success" => true,
                "message" => "Participante eliminado con éxito."
            ];
        } else {
            return [
                "success" => false,
                "message" => "No se pudo eliminar el participante."
            ];
        }
    } catch (PDOException $e) {
        return [
            "success" => false,
            "message" => "Error en la consulta: " . $e->getMessage()
        ];
    }
}

    public function actualizarParticipante($data) {
        try {
            // Validar y calcular edad
            if (empty($data['fechaNacimiento'])) {
                throw new Exception("Fecha de nacimiento requerida");
            }
            
            $fechaNacimiento = new DateTime($data['fechaNacimiento']);
            $edad = (new DateTime())->diff($fechaNacimiento)->y;

            $sql = "UPDATE tb_participante SET 
                    nombre = :nombre,
                    apellido = :apellido,
                    cedula = :cedula,
                    telefono = :telefono,
                    edad = :edad,
                    correo = :correo,
                    fecha_nacimiento = :fecha_nacimiento,
                    grado_institucion = :grado_institucion,
                    genero = :genero
                    WHERE id_participante = :id_participante";

            $stmt = $this->conn->prepare($sql);
            
            $params = [
                ':id_participante' => $data['id_participante'],
                ':nombre' => $data['nombre'],
                ':apellido' => $data['apellido'],
                ':cedula' => $data['cedula'],
                ':telefono' => $data['telefono'] ?? null,
                ':edad' => $edad,
                ':correo' => $data['correo'],
                ':fecha_nacimiento' => $data['fechaNacimiento'],
                ':grado_institucion' => $data['grado_institucion'],
                ':genero' => $data['genero']
            ];

            return $stmt->execute($params);

        } catch (PDOException $e) {
            error_log("Error PDO: " . $e->getMessage());
            throw $e;
        }
    }


      // Método para obtener un participante por ID
      public function verParticipante($id) {
        try {
            $sql = "SELECT 
                        id_participante,
                        nombre,
                        apellido,
                        cedula,
                        edad,
                        correo,
                        telefono,
                        DATE_FORMAT(fecha_nacimiento, '%d/%m/%Y') as fecha_nacimiento,
                        DATE_FORMAT(fecha_registro, '%d/%m/%Y') as fecha_registro,
                        grado_institucion,
                        genero
                    FROM tb_participante 
                    WHERE id_participante = :id";
    
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
    
            $participante = $stmt->fetch(PDO::FETCH_ASSOC);
    
            if ($participante) {
                return [
                    'success' => true,
                    'data' => [
                        'nombre' => $participante['nombre'],
                        'apellido' => $participante['apellido'],
                        'cedula' => $participante['cedula'],
                        'edad' => $participante['edad'],
                        'correo' => $participante['correo'],
                        'telefono' => $participante['telefono'],
                        'fecha_nacimiento' => $participante['fecha_nacimiento'],
                        'fecha_registro' => $participante['fecha_registro'],
                        'grado_institucion' => $participante['grado_institucion'],
                        'genero' => $participante['genero']
                    ]
                ];
            } else {
                return [
                    'success' => false,
                    'message' => 'Participante no encontrado'
                ];
            }
        } catch (PDOException $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener los datos: ' . $e->getMessage()
            ];
        }
    }

    public function obtenerParticipantes() {
        try {
            $sql = "SELECT * FROM tb_participante";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error en obtenerParticipantes: " . $e->getMessage());
            throw new Exception("Error al obtener participantes: " . $e->getMessage());
        }
    }

        // Obtener participante por ID
        public function obtenerPorId($id) {
            $sql = "SELECT * FROM tb_participante WHERE id_participante = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_OBJ);
        }


        public function obtenerCursosDisponibles() {
            $sql = "SELECT 
                        id_curso, 
                        CASE 
                            WHEN id_curso = 1 THEN 'No asignado' 
                            ELSE CONCAT(
                                nombre_curso, 
                                ' (', 
                                turno, 
                                ') - ', 
                                num_inscritos, 
                                '/', 
                                max_participantes
                            )
                        END AS display
                    FROM tb_curso
                    WHERE 
                        num_inscritos < max_participantes
                        AND id_estatusCurso = 1
                    ORDER BY 
                        FIELD(turno, 'Mañana', 'Tarde'), 
                        nombre_curso";
        
            try {
                $stmt = $this->conn->prepare($sql);
                $stmt->execute();
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
                
            } catch (PDOException $e) {
                error_log("Error en obtenerCursosDisponibles: " . $e->getMessage());
                return [];
            }
        }
        

        public function obtenerCursosParticipante($idParticipante) {
            try {
                // Obtener cursos activos
                $sqlActivos = "SELECT 
                                    c.nombre_curso, 
                                    DATE_FORMAT(pc.fecha_inscripcion, '%d/%m/%Y') as fecha_inicio,
                                    pc.estatus_participante as estado
                               FROM tb_participante_curso pc
                               JOIN tb_curso c ON pc.id_curso = c.id_curso
                               WHERE pc.id_participante = :id
                               AND pc.estatus_participante IN ('Pendiente', 'En formación')";
        
                $stmtActivos = $this->conn->prepare($sqlActivos);
                $stmtActivos->bindParam(':id', $idParticipante, PDO::PARAM_INT);
                $stmtActivos->execute();
                $cursosActivos = $stmtActivos->fetchAll(PDO::FETCH_ASSOC);
        
                // Obtener historial académico
                $sqlHistorial = "SELECT 
                                      c.nombre_curso, 
                                      DATE_FORMAT(pc.fecha_inscripcion, '%d/%m/%Y') as fecha_inicio,
                                      pc.estatus_participante as estado
                                  FROM tb_participante_curso pc
                                  JOIN tb_curso c ON pc.id_curso = c.id_curso
                                  WHERE pc.id_participante = :id
                                  AND pc.estatus_participante IN ('Aprobado', 'Reprobado')";
        
                $stmtHistorial = $this->conn->prepare($sqlHistorial);
                $stmtHistorial->bindParam(':id', $idParticipante, PDO::PARAM_INT);
                $stmtHistorial->execute();
                $historial = $stmtHistorial->fetchAll(PDO::FETCH_ASSOC);
        
                return [
                    'success' => true,
                    'cursosActivos' => $cursosActivos,
                    'historial' => $historial
                ];
        
            } catch (PDOException $e) {
                return [
                    'success' => false,
                    'message' => 'Error al obtener cursos: ' . $e->getMessage()
                ];
            }
        }


        public function filtrarParticipantes($filtros) {
            try {
                $sql = "SELECT * FROM tb_participante WHERE 1 = 1";
                $params = [];
    
                // Filtro Sexo
                if (!empty($filtros['sexo']) && in_array($filtros['sexo'], ['Masculino', 'Femenino'])) {
                    $sql .= " AND genero = :sexo";
                    $params[':sexo'] = $filtros['sexo'];
                }
    
                // Filtro Edad
                if (!empty($filtros['edad']) && preg_match('/^(\d+)-(\d+)$/', $filtros['edad'], $matches)) {
                    $sql .= " AND edad BETWEEN :edadMin AND :edadMax";
                    $params[':edadMin'] = (int)$matches[1];
                    $params[':edadMax'] = (int)$matches[2];
                }
    
                // Filtro Estado
                if (!empty($filtros['estado']) && in_array($filtros['estado'], ['En formación', 'Inactivo', 'En sistema', 'Asignado'])) {
                    $sql .= " AND estado = :estado";
                    $params[':estado'] = $filtros['estado'];
                }
    
                $stmt = $this->conn->prepare($sql);
                
                foreach ($params as $key => $value) {
                    $stmt->bindValue($key, $value);
                }
                
                $stmt->execute();
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            } catch (PDOException $e) {
                throw new Exception("Error de base de datos: " . $e->getMessage());
            }
        }

}
?>
