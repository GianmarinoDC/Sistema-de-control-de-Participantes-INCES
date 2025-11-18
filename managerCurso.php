<?php
require_once '../../modelo/conexion.php';

class Curso {
    private $conn;

    public function __construct() {
        $conexion = new Conexion();
        $this->conn = $conexion->getConexion();
    }


    // Método para verificar si el nombre del curso ya existe
public function verificarNombreCurso($nombre_curso) {
    $stmt = $this->conn->prepare("SELECT COUNT(*) FROM tb_curso WHERE nombre_curso = ?");
    $stmt->execute([$nombre_curso]);
    return $stmt->fetchColumn() > 0;
}

public function verificarNombreCursoEditar($nombre, $idExcluir = 0) {
    try {
        $sql = "SELECT COUNT(*) FROM tb_curso 
                WHERE nombre_curso = :nombre 
                AND id_curso != :idExcluir";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':idExcluir', $idExcluir, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetchColumn() > 0;
    } catch (PDOException $e) {
        error_log("Error en verificarNombreCurso: " . $e->getMessage());
        return false;
    }
}


    public function registrar($data) {
        try {
            // Validar campos requeridos
            $requiredFields = [
                'nombre_curso', 
                'fecha_inicio', 
                'fecha_fin',
                'turno'
            ];
            
            foreach ($requiredFields as $field) {
                if (empty($data[$field])) {
                    throw new Exception("El campo $field es obligatorio");
                }
            }
    
            // Validar fechas
            if (strtotime($data['fecha_inicio']) > strtotime($data['fecha_fin'])) {
                throw new Exception("La fecha de inicio no puede ser posterior a la fecha de fin");
            }
    
            $sql = "INSERT INTO tb_curso (
                        nombre_curso, 
                        fecha_inicio, 
                        fecha_fin, 
                        max_participantes,
                        id_modalidad, 
                        tipo_formacion,
                        id_estatusCurso, 
                        sectoreconomico,
                        id_motor, 
                        subtipo,
                        id_areaFormativa, 
                        ambito,
                        turno, 
                        programa_formacion
                    ) VALUES (
                        :nombre_curso, 
                        :fecha_inicio, 
                        :fecha_fin, 
                        :max_participantes,
                        :id_modalidad, 
                        :tipo_formacion,
                        :id_estatusCurso, 
                        :sectoreconomico,
                        :id_motor, 
                        :subtipo,
                        :id_areaFormativa, 
                        :ambito,
                        :turno, 
                        :programa_formacion
                    )";
    
            $stmt = $this->conn->prepare($sql);
            
            // Valores por defecto para campos opcionales
            $defaultValues = [
                'max_participantes' => 30,
                'id_estatusCurso' => 1, // 'En espera' por defecto
                'num_inscritos' => 0    // Aunque no se inserta, se establece por defecto en la tabla
            ];
    
            $params = [
                ':nombre_curso' => $data['nombre_curso'],
                ':fecha_inicio' => $data['fecha_inicio'],
                ':fecha_fin' => $data['fecha_fin'],
                ':max_participantes' => $data['max_participantes'] ?? $defaultValues['max_participantes'],
                ':id_modalidad' => $data['id_modalidad'] ?? null,
                ':tipo_formacion' => $data['tipo_formacion'] ?? null,
                ':id_estatusCurso' => $data['id_estatusCurso'] ?? $defaultValues['id_estatusCurso'],
                ':sectoreconomico' => $data['sectoreconomico'] ?? null,
                ':id_motor' => $data['id_motor'] ?? null,
                ':subtipo' => $data['subtipo'] ?? null,
                ':id_areaFormativa' => $data['id_areaFormativa'] ?? null,
                ':ambito' => $data['ambito'] ?? null,
                ':turno' => $data['turno'],
                ':programa_formacion' => $data['programa_formacion'] ?? null
            ];
    
            $stmt->execute($params);
    
            return [
                "success" => true,
                "message" => "Curso registrado con éxito",
                "id_curso" => $this->conn->lastInsertId()
            ];
    
        } catch (PDOException $e) {
            error_log("Error al registrar curso: " . $e->getMessage());
            return [
                "success" => false,
                "message" => "Error al registrar el curso en la base de datos",
                "error" => $e->getMessage()
            ];
        } catch (Exception $e) {
            error_log("Error de validación: " . $e->getMessage());
            return [
                "success" => false,
                "message" => $e->getMessage()
            ];
        }
    }

    public function asignarDocenteCurso(int $idCurso, int $idDocente) {
        $sql = "INSERT INTO tb_docente_curso (id_docente, id_curso) VALUES (:doc, :cur)";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            ':doc' => $idDocente,
            ':cur' => $idCurso
        ]);
    }



    public function obtenerCursos() {
        try {
            $sql = "SELECT c.id_curso, 
                           c.nombre_curso, 
                           m.nombre_modalidad, 
                           mot.nombre_motor, 
                           c.programa_formacion, 
                           af.nombre_areaFormativa, 
                           c.fecha_inicio, 
                           c.fecha_fin,
                           c.turno,
                           c.num_inscritos, 
                           c.max_participantes, 
                           ec.nombre_estatusCurso AS estatus 
                      FROM tb_curso c
                      JOIN tb_modalidad m ON c.id_modalidad = m.id_modalidad
                      JOIN tb_motor mot ON c.id_motor = mot.id_motor
                      JOIN tb_areaformativa af ON c.id_areaFormativa = af.id_areaFormativa
                      JOIN tb_estatuscurso ec ON c.id_estatusCurso = ec.id_estatusCurso";
            
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
    
            $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            return $resultados ?: [];
        } catch (PDOException $e) {
            return [
                "success" => false,
                "message" => "Error al obtener los cursos: " . $e->getMessage()
            ];
        }
    }

    public function obtenerCursoFiltros($filtros) {
        try {
            $sql = "SELECT 
                        c.id_curso, 
                        c.nombre_curso, 
                        c.fecha_inicio, 
                        c.fecha_fin, 
                        c.max_participantes, 
                        c.num_inscritos, 
                        c.tipo_formacion, 
                        c.sectoreconomico, 
                        c.subtipo, 
                        c.ambito, 
                        c.programa_formacion, 
                        c.turno, 
                        m.nombre_modalidad, 
                        e.nombre_estatuscurso
                    FROM tb_curso c
                    LEFT JOIN tb_modalidad m ON c.id_modalidad = m.id_modalidad
                    LEFT JOIN tb_estatuscurso e ON c.id_estatusCurso = e.id_estatusCurso
                    WHERE c.id_curso <> 1"; // Excluir curso con ID 1
    
            $params = [];
    
            if (!empty($filtros['modalidad'])) {
                $sql .= " AND c.id_modalidad = :modalidad";
                $params[':modalidad'] = $filtros['modalidad'];
            }
            if (!empty($filtros['estado'])) {
                $sql .= " AND c.id_estatusCurso = :estado";
                $params[':estado'] = $filtros['estado'];
            }
            if (!empty($filtros['turno'])) {
                $sql .= " AND c.turno = :turno";
                $params[':turno'] = $filtros['turno'];
            }
    
            $stmt = $this->conn->prepare($sql);
    
            foreach ($params as $key => $val) {
                $stmt->bindValue($key, $val);
            }
    
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        } catch (Exception $e) {
            error_log($e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }
    

    public function obtenerCursoPorId($id) {
        try {
            $sql = "SELECT 
                        c.id_curso,
                        c.nombre_curso,
                        c.fecha_inicio,
                        c.fecha_fin,
                        c.max_participantes,
                        c.num_inscritos,
                        c.id_modalidad,
                        c.tipo_formacion,
                        c.id_estatusCurso,
                        c.sectoreconomico,
                        c.id_motor,
                        c.subtipo,
                        c.id_areaFormativa,
                        c.ambito,
                        c.turno,
                        c.programa_formacion,
                        m.nombre_modalidad,
                        mot.nombre_motor,
                        af.nombre_areaFormativa
                    FROM tb_curso c
                    LEFT JOIN tb_modalidad m ON c.id_modalidad = m.id_modalidad
                    LEFT JOIN tb_motor mot ON c.id_motor = mot.id_motor
                    LEFT JOIN tb_areaformativa af ON c.id_areaFormativa = af.id_areaFormativa
                    WHERE c.id_curso = :id";
    
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
    
            $curso = $stmt->fetch(PDO::FETCH_ASSOC);
    
            if (!$curso) {
                return ["error" => "Curso no encontrado"];
            }
    
            // Formato de fechas seguro
            $curso['fecha_inicio'] = ($curso['fecha_inicio'] && $curso['fecha_inicio'] !== '0000-00-00') ? date('Y-m-d', strtotime($curso['fecha_inicio'])) : null;
            $curso['fecha_fin'] = ($curso['fecha_fin'] && $curso['fecha_fin'] !== '0000-00-00') ? date('Y-m-d', strtotime($curso['fecha_fin'])) : null;
    
            return $curso;
    
        } catch (PDOException $e) {
            error_log("Error en obtenerCursoPorId: " . $e->getMessage());
            return [
                "error" => "Error de base de datos",
                "detalle" => $e->getMessage()
            ];
        }
    }
    

    public function editar($data) {
        try {
            $sql = "UPDATE tb_curso SET
                    nombre_curso = :nombre_curso,
                    id_modalidad = :id_modalidad,
                    id_motor = :id_motor,
                    id_areaFormativa = :id_areaFormativa,
                    fecha_inicio = :fecha_inicio,
                    fecha_fin = :fecha_fin,
                    max_participantes = :max_participantes,
                    sectoreconomico = :sectoreconomico,
                    subtipo = :subtipo,
                    ambito = :ambito,
                    turno = :turno,
                    tipo_formacion = :tipo_formacion,
                    programa_formacion = :programa_formacion
                    WHERE id_curso = :id_curso";
    
            $stmt = $this->conn->prepare($sql);
            $params = [
                ':nombre_curso' => $data['nombre_curso-Edit'],
                ':id_modalidad' => $data['id_modalidad-Edit'],
                ':id_motor' => $data['id_motor-Edit'],
                ':id_areaFormativa' => $data['id_areaFormativa-Edit'],
                ':fecha_inicio' => $data['fecha_inicio-Edit'],
                ':fecha_fin' => $data['fecha_fin-Edit'],
                ':max_participantes' => $data['max_participantes-Edit'],
                ':sectoreconomico' => $data['sectoreconomico-Edit'],
                ':subtipo' => $data['subtipo-Edit'],
                ':ambito' => $data['ambito-Edit'],
                ':turno' => $data['turno-Edit'],
                ':tipo_formacion' => $data['tipo_formacion-Edit'],
                ':programa_formacion' => $data['programa_formacion-Edit'],
                ':id_curso' => $data['id_curso']
            ];
    
            $stmt->execute($params);
    
            return [
                'success' => true,
                'message' => 'Curso actualizado exitosamente',
                'affected_rows' => $stmt->rowCount()
            ];
    
        } catch (PDOException $e) {
            error_log("Error en editar curso: " . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Error en base de datos: ' . $e->getMessage()
            ];
        }
    }

    public function verCurso($id) {
        try {
            // Consulta principal para obtener los datos del curso
            $sql = "SELECT 
                        c.id_curso,
                        c.nombre_curso,
                        c.fecha_inicio,
                        c.fecha_fin,
                        c.max_participantes,
                        c.num_inscritos,
                        c.id_modalidad,
                        c.tipo_formacion,
                        c.ambito,
                        c.sectoreconomico,
                        c.id_motor,
                        c.subtipo,
                        c.id_areaFormativa,
                        c.turno,
                        c.programa_formacion,  -- Aquí obtenemos el campo enum
                        m.nombre_modalidad AS modalidad,
                        mot.nombre_motor AS motor,
                        af.nombre_areaFormativa AS area_formativa,
                        ec.nombre_estatusCurso AS estado
                    FROM tb_curso c
                    LEFT JOIN tb_modalidad m ON c.id_modalidad = m.id_modalidad
                    LEFT JOIN tb_motor mot ON c.id_motor = mot.id_motor
                    LEFT JOIN tb_areaformativa af ON c.id_areaFormativa = af.id_areaFormativa
                    LEFT JOIN tb_estatuscurso ec ON c.id_estatusCurso = ec.id_estatusCurso
                    WHERE c.id_curso = :id";
    
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
    
            // Obtener los datos del curso
            $curso = $stmt->fetch(PDO::FETCH_ASSOC);
    
            // Verificar si el curso fue encontrado
            if (!$curso) {
                return [
                    'success' => false,
                    'message' => 'Curso no encontrado'
                ];
            }
    
            return [
                'success' => true,
                'data' => [
                    'id' => $curso['id_curso'],
                    'nombre' => $curso['nombre_curso'],
                    'fechaInicio' => $curso['fecha_inicio'],
                    'fechaCulminacion' => $curso['fecha_fin'],
                    'maxParticipantes' => $curso['max_participantes'],
                    'numInscritos' => $curso['num_inscritos'],
                    'turno' => $curso['turno'],
                    'tipoFormacion' => $curso['tipo_formacion'],
                    'ambito' => $curso['ambito'],
                    'sectorEconomico' => $curso['sectoreconomico'],
                    'modalidad' => $curso['modalidad'],
                    'motor' => $curso['motor'],
                    'areaFormativa' => $curso['area_formativa'],
                    'estado' => $curso['estado'],
                    'programa_formacion' => $curso['programa_formacion'],  // Aquí obtenemos el valor del campo enum
                    'subtipo' => $curso['subtipo']
                ]
            ];
        } catch (PDOException $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener el curso: ' . $e->getMessage()
            ];
        }
    }

    public function obtenerDocentePorCurso($idCurso) {
        $sql = "
            SELECT 
                d.nombre, 
                d.cedula, 
                d.edad
            FROM tb_docente d
            INNER JOIN tb_docente_curso dc 
                ON d.id_docente = dc.id_docente
            WHERE dc.id_curso = ?
            LIMIT 1
        ";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$idCurso]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    

    


public function eliminarCurso($id) {
    try {
        // Primero, verificar si el curso tiene participantes asociados
        $sqlVerificar = "SELECT COUNT(*) FROM tb_participante_curso WHERE id_curso = :id";
        $stmtVerificar = $this->conn->prepare($sqlVerificar);
        $stmtVerificar->bindParam(':id', $id, PDO::PARAM_INT);
        $stmtVerificar->execute();
        $participantesCount = $stmtVerificar->fetchColumn();

        // Si hay participantes asociados, no se puede eliminar
        if ($participantesCount > 0) {
            return [
                "success" => false,
                "message" => "No se puede eliminar el curso, ya que tiene registros de participantes y/o docentes asignados"
            ];
        }

        // Si no hay participantes, proceder a eliminar el curso
        $sql = "DELETE FROM tb_curso WHERE id_curso = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return [
                "success" => true,
                "message" => "Curso eliminado con éxito"
            ];
        } else {
            return [
                "success" => false,
                "message" => "No se encontró el Curso con ID: " . $id
            ];
        }
    } catch (PDOException $e) {
        return [
            "success" => false,
            "message" => "Error en la consulta: " . $e->getMessage()
        ];
    }
}






    public function obtenerParticipantesDisponibles($id_curso, $busqueda = '') {
        try {
            $sql = "SELECT p.id_participante, p.nombre, p.apellido, p.cedula 
                    FROM tb_participante p
                    WHERE NOT EXISTS (
                        SELECT 1 
                        FROM tb_participante_curso pc 
                        WHERE pc.id_participante = p.id_participante 
                        AND pc.id_curso = :id_curso 
                        AND pc.estatus_participante = 'Pendiente'
                    )
                    AND (p.nombre LIKE :busqueda 
                    OR p.apellido LIKE :busqueda 
                    OR p.cedula LIKE :busqueda)";
            
            $stmt = $this->conn->prepare($sql);
            $busquedaParam = "%$busqueda%";
            $stmt->bindParam(':id_curso', $id_curso, PDO::PARAM_INT);
            $stmt->bindParam(':busqueda', $busquedaParam, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
            
        } catch(PDOException $e) {
            error_log("ERROR obtenerParticipantesDisponibles: " . $e->getMessage());
            return [];
        }
    }

// Obtener participantes inscritos
public function obtenerParticipantesInscritos($id_curso) {
    try {
        // Consultar solo los participantes cuyo estatus sea "Pendiente"
        $sql = "SELECT p.*, pc.id_participante_curso 
                FROM tb_participante_curso pc
                JOIN tb_participante p ON pc.id_participante = p.id_participante
                WHERE pc.id_curso = :id_curso AND pc.estatus_participante = 'Pendiente'";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id_curso', $id_curso, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
        
    } catch(PDOException $e) {
        error_log("Error en obtenerParticipantesInscritos: " . $e->getMessage());
        return [];
    }
}


public function agregarParticipante($id_participante, $id_curso) {
    try {
        $this->conn->beginTransaction();

        // 1. Obtener información del curso
        $sqlCursoInfo = "SELECT fecha_inicio, fecha_fin, max_participantes, num_inscritos, id_estatusCurso 
                         FROM tb_curso 
                         WHERE id_curso = :id_curso";
        $stmtCursoInfo = $this->conn->prepare($sqlCursoInfo);
        $stmtCursoInfo->execute([':id_curso' => $id_curso]);
        $curso = $stmtCursoInfo->fetch(PDO::FETCH_ASSOC);

        if (!$curso || $curso['id_estatusCurso'] != 1) {
            throw new Exception("Curso no disponible para asignaciones");
        }

        if ($curso['num_inscritos'] >= $curso['max_participantes']) {
            throw new Exception("El curso ha alcanzado el máximo de participantes");
        }

        $fechaInicio = $curso['fecha_inicio'];
        $fechaFin = $curso['fecha_fin'];

        // 2. Verificar si ya existe un registro válido en tb_participante_curso
        $sqlCheck = "SELECT id_participante_curso 
                     FROM tb_participante_curso 
                     WHERE id_participante = :id_p 
                     AND id_curso = :id_c 
                     AND estatus_participante IN ('Pendiente', 'En formación')";
        $stmtCheck = $this->conn->prepare($sqlCheck);
        $stmtCheck->execute([':id_p' => $id_participante, ':id_c' => $id_curso]);

        if ($stmtCheck->rowCount() > 0) {
            throw new Exception("El participante ya está inscrito en este curso con un estatus válido.");
        }

        // 3. Insertar nuevo registro en tb_participante_curso
        $sqlInsert = "INSERT INTO tb_participante_curso 
                      (id_participante, id_curso, fecha_inscripcion, FechaInicio, FechaFin, estatus_participante)
                      VALUES (:id_p, :id_c, CURDATE(), :fecha_inicio, :fecha_fin, 'Pendiente')";
        $stmtInsert = $this->conn->prepare($sqlInsert);
        $stmtInsert->execute([
            ':id_p' => $id_participante,
            ':id_c' => $id_curso,
            ':fecha_inicio' => $fechaInicio,
            ':fecha_fin' => $fechaFin
        ]);

        // 4. Incrementar contador de inscritos en tb_curso
        $sqlUpdateInscritos = "UPDATE tb_curso 
                               SET num_inscritos = num_inscritos + 1 
                               WHERE id_curso = :id_c";
        $stmtUpdate = $this->conn->prepare($sqlUpdateInscritos);
        $stmtUpdate->execute([':id_c' => $id_curso]);

        // 5. Actualizar estado del participante en tb_participante
        $sqlParticipante = "UPDATE tb_participante 
                            SET estado = 'Asignado' 
                            WHERE id_participante = :id_p 
                            AND estado != 'Asignado'";
        $stmtParticipante = $this->conn->prepare($sqlParticipante);
        $stmtParticipante->execute([':id_p' => $id_participante]);

        $this->conn->commit();
        return true;

    } catch (PDOException $e) {
        $this->conn->rollBack();
        error_log("Error PDO: " . $e->getMessage());
        return false;
    } catch (Exception $e) {
        $this->conn->rollBack();
        error_log("Error General: " . $e->getMessage());
        return false;
    }
}


public function eliminarParticipante($id_participante_curso) {
    try {
        $this->conn->beginTransaction();

        // 1. Obtener id_curso e id_participante
        $sqlSelect = "SELECT id_curso, id_participante 
                     FROM tb_participante_curso 
                     WHERE id_participante_curso = :id";
        $stmtSelect = $this->conn->prepare($sqlSelect);
        $stmtSelect->execute([':id' => $id_participante_curso]);
        $info = $stmtSelect->fetch(PDO::FETCH_ASSOC);

        if (!$info) {
            throw new Exception("Registro no encontrado");
        }

        $id_participante = $info['id_participante'];
        $id_curso = $info['id_curso'];

        // 2. Eliminar registro
        $sqlDelete = "DELETE FROM tb_participante_curso 
                     WHERE id_participante_curso = :id";
        $stmtDelete = $this->conn->prepare($sqlDelete);
        $stmtDelete->execute([':id' => $id_participante_curso]);
        $deleted = $stmtDelete->rowCount() > 0;

        // 3. Actualizar contador del curso
        if ($deleted) {
            $sqlUpdateCurso = "UPDATE tb_curso 
                             SET num_inscritos = num_inscritos - 1 
                             WHERE id_curso = :id_curso";
            $stmtUpdateCurso = $this->conn->prepare($sqlUpdateCurso);
            $stmtUpdateCurso->execute([':id_curso' => $id_curso]);
        }

        // 4. Verificar si el participante no tiene más cursos
        if ($deleted) {
            $sqlCheckCursos = "SELECT COUNT(*) 
                              FROM tb_participante_curso 
                              WHERE id_participante = :id_participante";
            $stmtCheck = $this->conn->prepare($sqlCheckCursos);
            $stmtCheck->execute([':id_participante' => $id_participante]);
            $totalCursos = $stmtCheck->fetchColumn();

            // Actualizar estado si no tiene más cursos
            if ($totalCursos == 0) {
                $sqlUpdateEstado = "UPDATE tb_participante 
                                   SET estado = 'Inactivo' 
                                   WHERE id_participante = :id_participante";
                $stmtUpdateEstado = $this->conn->prepare($sqlUpdateEstado);
                $stmtUpdateEstado->execute([':id_participante' => $id_participante]);
            }
        }

        $this->conn->commit();
        return $deleted;

    } catch(PDOException $e) {
        $this->conn->rollBack();
        error_log("Error en base de datos: " . $e->getMessage());
        return false;
    } catch(Exception $e) {
        $this->conn->rollBack();
        error_log("Error general: " . $e->getMessage());
        return false;
    }
}

// Obtener información del curso
public function obtenerInfoCurso($id_curso) {
    try {
        $sql = "SELECT num_inscritos, max_participantes, id_estatusCurso 
                FROM tb_curso 
                WHERE id_curso = :id_curso";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id_curso', $id_curso, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
        
    } catch(PDOException $e) {
        error_log("Error en obtenerInfoCurso: " . $e->getMessage());
        return false;
    }
}

private function validarEstadoCurso($id_curso) {
    $info = $this->obtenerInfoCurso($id_curso);
    return $info['id_estatusCurso'] == 1; // 1 = En espera
}


public function obtenerParticipantesPorCurso($id_curso) {
    try {
        $sql = "SELECT 
                    pc.id_participante_curso,
                    pc.estatus_participante,
                    p.nombre,
                    p.apellido,
                    p.cedula
                FROM tb_participante_curso pc
                INNER JOIN tb_participante p ON pc.id_participante = p.id_participante
                WHERE pc.id_curso = :id_curso
                  AND pc.estatus_participante IN ('Pendiente', 'En formación')"; // Filtra "Pendiente" y "En formación"

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id_curso', $id_curso, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        error_log("Error en obtenerParticipantesPorCurso: " . $e->getMessage());
        return [];
    }
}



public function obtenerIdEstatusCurso($id_curso) {
    try {
        $sql = "SELECT id_estatusCurso FROM tb_curso WHERE id_curso = :id_curso";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id_curso', $id_curso, PDO::PARAM_INT);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ? (int)$row['id_estatusCurso'] : null;
    } catch (PDOException $e) {
        error_log("Error en obtenerIdEstatusCurso: " . $e->getMessage());
        return null;
    }
}


public function finalizarCurso($id_curso) {
    try {
        $sql = "UPDATE tb_curso SET id_estatusCurso = 3 WHERE id_curso = :id_curso";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id_curso', $id_curso, PDO::PARAM_INT);
        return $stmt->execute();
    } catch (PDOException $e) {
        error_log("Error al finalizar curso: " . $e->getMessage());
        return false;
    }
}


public function obtenerCursoBasico($id_curso) {
    try {
        $sql = "SELECT id_curso, nombre_curso, fecha_fin FROM tb_curso WHERE id_curso = :id_curso";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id_curso', $id_curso, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        error_log("Error en obtenerCursoBasico: " . $e->getMessage());
        return null;
    }
}


// Guardar las notas de un participante
public function guardarNotas($idParticipanteCurso, $estado) {
    $sql = "UPDATE tb_participante_curso SET estatus_participante = ? WHERE id_participante_curso = ?";
    $stmt = $this->conn->prepare($sql);
    return $stmt->execute([$estado, $idParticipanteCurso]);
}

// Cambiar el estado del curso
public function cambiarEstadoCurso($idCurso, $nuevoEstado) {
    $sql = "UPDATE tb_curso SET id_estatusCurso = ? WHERE id_curso = ?";
    $stmt = $this->conn->prepare($sql);
    return $stmt->execute([$nuevoEstado, $idCurso]);
}



public function actualizarEstadoDocente(int $idDocente) {
    $sql = "
        UPDATE tb_docente
        SET estado_docente = 'Asignado'
        WHERE id_docente = :docente
          AND estado_docente <> 'En formación'
    ";
    $stmt = $this->conn->prepare($sql);
    $stmt->execute([':docente' => $idDocente]);
}


}
?>
