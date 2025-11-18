<?php
require('./fpdf.php');
require('../../modelo/conexion.php');

class PDF extends FPDF
{
    private $cursoData;
    private $estudiantesData;

    function Header()
    {
        $this->Image('../../../assets/img/inces-logo.png', 10, 8, 40);
        
        $this->SetFont('Arial', '', 7);
        $this->SetXY(12, 26);
        $this->Cell(100, 5, utf8_decode('Instituto Nacional de Capacitación y'), 0, 1, 'L');
        $this->SetXY(20, 30);
        $this->Cell(100, 5, utf8_decode('Educación Socialista'), 0, 1, 'L');

        $this->SetFont('Arial', '', 10);
        $this->SetXY(11, 36);
        $this->Cell(100, 5, utf8_decode('CFSB/N°570021211/0020'), 0, 1, 'L');

        $meses = [
            1 => 'Enero', 2 => 'Febrero', 3 => 'Marzo', 4 => 'Abril',
            5 => 'Mayo', 6 => 'Junio', 7 => 'Julio', 8 => 'Agosto',
            9 => 'Septiembre', 10 => 'Octubre', 11 => 'Noviembre', 12 => 'Diciembre'
        ];
        $fecha = 'Cumaná, ' . date('d') . ' de ' . $meses[date('n')] . ' de ' . date('Y');
        $this->SetXY(140, 34);
        $this->Cell(0, 10, utf8_decode($fecha), 0, 0, 'R');

        $this->SetDrawColor(128, 0, 32);
        $this->SetLineWidth(1.5);
        $this->Line(10, 24, 54, 24);

        $this->Ln(35);
    }

    function Footer()
    {
        $this->SetY(-35);
        $this->Image('../../../assets/img/gobierno-logo.png', 55, $this->GetY(), 100);

        $this->SetY(-10);
        $this->SetFillColor(128, 0, 32);
        $this->Rect(0, $this->GetY(), 210, 10, 'F');

        $this->SetFont('Arial', '', 7);
        $this->SetTextColor(255, 255, 255);
        $this->SetXY(10, $this->GetY() + 2);
        $this->Cell(190, 5, utf8_decode('Av. Principal Bolivariano INCES INDUSTRIAL, Parroquia Altagracia, Estado Sucre    Teléfonos: 0293-4514290 / 4516753'), 0, 1, 'C');
    }

    function generarContenido()
    {
        // Título
        $this->SetFont('Arial', 'B', 16);
        $this->Cell(0, 10, utf8_decode('LISTA MATRICULAR'), 0, 1, 'C');
        $this->Ln(12);

        // Información del curso
        $this->SetFont('Arial', 'B', 14);
        $this->Cell(0, 10, utf8_decode('Curso: ' . $this->cursoData['nombre_curso']), 0, 1, 'L');
        
            $this->SetFont('Arial', '', 12);
    $this->Cell(95, 10, utf8_decode('Fecha Inicio: ' . date('d/m/Y', strtotime($this->cursoData['fecha_inicio']))), 0, 0, 'L'); // ✅ Corregido
    $this->Cell(95, 10, utf8_decode('Fecha Fin: ' . date('d/m/Y', strtotime($this->cursoData['fecha_fin']))), 0, 1, 'R'); // ✅ Corregido
    $this->Ln(15);

        // Tabla
        if (!empty($this->estudiantesData)) {
            $this->SetFillColor(220, 220, 220);
            $this->SetFont('Arial', 'B', 12);
            
            // Encabezados
            $this->Cell(50, 10, 'CEDULA', 1, 0, 'C', true);
            $this->Cell(90, 10, 'NOMBRE COMPLETO', 1, 0, 'C', true);
            $this->Cell(30, 10, 'GENERO', 1, 0, 'C', true);
            $this->Cell(20, 10, 'EDAD', 1, 1, 'C', true);

            // Datos
            $this->SetFont('Arial', '', 12);
            foreach ($this->estudiantesData as $estudiante) {
                // Formatear cédula con puntos
                $cedula = number_format((int)$estudiante['cedula'], 0, '', '.');
                
                // Obtener género
                $genero = $estudiante['genero'];

                // Calcular edad
                $edad = $this->calcularEdad($estudiante['fecha_nacimiento']);

                $this->Cell(50, 10, utf8_decode($cedula), 1, 0, 'C');
                $this->Cell(90, 10, utf8_decode($estudiante['nombre'] . ' ' . $estudiante['apellido']), 1);
                $this->Cell(30, 10, utf8_decode($genero), 1, 0, 'C');
                $this->Cell(20, 10, $edad, 1, 1, 'C');
            }
        } else {
            $this->SetFont('Arial', 'I', 14);
            $this->Cell(0, 15, utf8_decode('No hay estudiantes inscritos en este curso'), 0, 1, 'C');
        }
    }

    function calcularEdad($fecha_nacimiento)
    {
        try {
            $fecha_nac = new DateTime($fecha_nacimiento);
            $hoy = new DateTime();
            return $hoy->diff($fecha_nac)->y;
        } catch (Exception $e) {
            return 'N/A';
        }
    }

    function setCursoData($data)
    {
        $this->cursoData = $data;
    }

    function setEstudiantesData($data)
    {
        $this->estudiantesData = $data;
    }
}

// Validación
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) die("ID inválido");
$id_curso = intval($_GET['id']);

try {
    $conexion = new Conexion();
    $conn = $conexion->getConexion();

    // Obtener curso
    $stmtCurso = $conn->prepare("SELECT * FROM tb_curso WHERE id_curso = :id");
    $stmtCurso->bindParam(':id', $id_curso, PDO::PARAM_INT);
    $stmtCurso->execute();
    $curso = $stmtCurso->fetch(PDO::FETCH_ASSOC);

    if (!$curso) throw new Exception("Curso no encontrado");

    // Obtener estudiantes PENDIENTES
    $stmtEstudiantes = $conn->prepare("
        SELECT p.cedula, p.nombre, p.apellido, p.genero, p.fecha_nacimiento
        FROM tb_participante_curso pc
        INNER JOIN tb_participante p ON pc.id_participante = p.id_participante
        WHERE pc.id_curso = :id AND pc.estatus_participante = 'Pendiente'
        ORDER BY p.nombre ASC
    ");
    $stmtEstudiantes->bindParam(':id', $id_curso, PDO::PARAM_INT);
    $stmtEstudiantes->execute();
    $estudiantes = $stmtEstudiantes->fetchAll(PDO::FETCH_ASSOC);

    // Generar PDF
    $pdf = new PDF();
    $pdf->AddPage();
    $pdf->setCursoData($curso);
    $pdf->setEstudiantesData($estudiantes);
    $pdf->generarContenido();
    $pdf->Output('I', 'Lista_Inscritos_' . preg_replace('/[^a-zA-Z0-9]/', '_', $curso['nombre_curso']) . '.pdf');

} catch (PDOException $e) {
    die("Error de base de datos: " . $e->getMessage());
} catch (Exception $e) {
    die($e->getMessage());
}
?>