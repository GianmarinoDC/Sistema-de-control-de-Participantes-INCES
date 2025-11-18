<?php
// Verificar sesión al inicio del archivo
session_start();

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Redirigir al login si no hay sesión activa
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header('Location: index.php');
    exit;
}

// Incluir el archivo de conexión de la base de datos
include('../modelo/conexion.php');

// Crear una instancia de la clase Conexion
$conexion = new Conexion();
$conn = $conexion->getConexion();

// Función para obtener el total de participantes
function getTotalParticipantes($conn) {
    $sql = "SELECT COUNT(*) as total_participantes FROM tb_participante";
    $result = $conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    return $row['total_participantes'];
}

// Función corregida para obtener los participantes en formación (estado = 'En formación')
function getTotalFormacion($conn) {
    $sql = "SELECT COUNT(*) as total_formacion FROM tb_participante WHERE estado = 'En formación'";
    $result = $conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    return $row['total_formacion'];
}

// Función para obtener el total de cursos (excluyendo el curso "No asignado")
function getTotalCursos($conn) {
    $sql = "SELECT COUNT(*) as total_cursos FROM tb_curso WHERE id_curso != 1";
    $result = $conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    return $row['total_cursos'];
}

// Función para obtener el total de docentes
function getTotalDocentes($conn) {
    $sql = "SELECT COUNT(*) as total_docentes FROM tb_docente";
    $result = $conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    return $row['total_docentes'];
}

// Obtener los datos de la base de datos
$total_participantes = getTotalParticipantes($conn);
$total_formacion = getTotalFormacion($conn);
$total_cursos = getTotalCursos($conn);
$total_docentes = getTotalDocentes($conn);

// Obtener los cursos y participantes
$sql = "SELECT 
            pc.id_curso, 
            c.nombre_curso, 
            COUNT(pc.id_participante) as total_participantes
        FROM tb_participante_curso pc
        JOIN tb_curso c ON pc.id_curso = c.id_curso
        WHERE pc.estatus_participante IN ('Pendiente', 'En formación')
        GROUP BY pc.id_curso, c.nombre_curso
        ORDER BY c.nombre_curso";

$result = $conn->query($sql);

$labels = [];
$data = [];

$sql = "SELECT estado, COUNT(*) as total_participantes FROM tb_participante GROUP BY estado";
$result = $conn->query($sql);

while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $labels[] = $row['estado'];
    $data[] = $row['total_participantes'];
}


// Consulta para contar los participantes de cada género
$sql = "SELECT genero, COUNT(*) as total FROM tb_participante GROUP BY genero";
$query = $conn->query($sql);

// Arreglo para guardar los datos de género
$generos = ['Masculino' => 0, 'Femenino' => 0];

// Recoger los datos de la base de datos
while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
    $generos[$row['genero']] = $row['total'];
}

// Pasar los valores de los géneros a JavaScript
$masculino = $generos['Masculino'];
$femenino = $generos['Femenino'];

// Cerrar la conexión
$conn = null;


// Preparar los datos primero
$nombre = htmlspecialchars($_SESSION['nombre'] ?? '');
$apellido = htmlspecialchars($_SESSION['apellido'] ?? '');
$rol = htmlspecialchars($_SESSION['rol'] ?? '');

// Manejar la ruta de la imagen correctamente
$imagenBase = '../../assets/img/avatar/default-user.png';
$imagenUsuario = $_SESSION['imagen'] ?? '';

// Construir la ruta completa de la imagen
if (!empty($imagenUsuario)) {
    // Si la imagen comienza con 'assets/', ajustamos la ruta relativa
    if (strpos($imagenUsuario, 'assets/') === 0) {
        $imagen = '../../' . $imagenUsuario;
    } else {
        $imagen = $imagenUsuario;
    }
} else {
    $imagen = $imagenBase;
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../assets/css/home.css">
    <title>Home</title>
</head>
<body class="no-transition">

    <div class="wrapper">
        <!-- SideBar -->
        <aside id="sidebar">
            <div class="d-flex">
                <!-- Btn Menu -->
                <button id="toggle-btn" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#fff" class="bi bi-grid" viewBox="0 0 16 16">
                        <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"/>
                      </svg>
                </button>

                <!-- Logo Menu-->
                <div class="sidebar-logo">
                    <img src="../../assets/img/inces-logo.png" alt="inces-logo">
                </div>

            </div>

            <!-- Links Menu -->
            <ul class="sidebar-nav">
                <li class="sidebar-item">
                    <a href="Inicio.php" class="sidebar-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
                            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
                          </svg>
                        <span>Inicio</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="participante.php" class="sidebar-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                          </svg>
                        <span>Participantes</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="cursos.php" class="sidebar-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book-half" viewBox="0 0 16 16">
                            <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
                          </svg>
                        <span>Cursos</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="docente.php" class="sidebar-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-workspace" viewBox="0 0 16 16">
                            <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                            <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z"/>
                          </svg>
                        <span>Docentes</span>
                    </a>
                </li>
                <li class="sidebar-item"  id="sidebar-usuario">
                    <a href="usuario.php" class="sidebar-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-vcard-fill" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0"/>
                          </svg>
                        <span>Usuarios</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="reporte.php" class="sidebar-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-line" viewBox="0 0 16 16">
                        <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1zm1 12h2V2h-2zm-3 0V7H7v7zm-5 0v-3H2v3z"/>
                        </svg>
                        <span>Reportes</span>
                    </a>
                </li>
            </ul>
            <div class="sidebar-footer">
                <a href="../controlador/Usuario/cerrar_sesion.php" class="sidebar-link sidebar-link-logoht">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                        <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                      </svg>
                    <span>Cerrar Sesión</span>
                </a>
            </div>
        </aside>
        <!-- Main -->
        <div class="main">

            <!-- Header -->
            <div class="header d-flex justify-content-between shadow-sm">
                <div class="title d-flex justify-content-center align-items-center">
                    <h1 class="ps-3">Control de Participantes </h1>
                </div>
                <div class="user d-flex align-items-center p-4 mt-2">
    <div class="user-info d-flex flex-column align-items-center pe-3">
        <h4><?php echo $nombre . ' ' . $apellido; ?></h4>
        <p><?php echo $rol; ?></p>
    </div>
    <div class="rounded-circle icon-user">
        <img src="<?php echo $imagen; ?>" 
             alt="Foto de perfil de <?php echo $nombre . ' ' . $apellido; ?>" 
             class="user-avatar"
             onerror="this.src='<?php echo $imagenBase; ?>'; this.classList.add('error-image')">
    </div>
</div>
            </div>

            <!-- Main -->
            <div>
                    <div class="row mt-4 mx-2 row-cols-md-2 g-2">
                        <div class="col-xl-3 col-md-6">

                            <div class="card shadow-lg" style="min-height: 100px; background-color: #EB7777">
                            <div class="card-body d-flex justify-content-between align-items-center text-white">
                                <div class="d-flex flex-column text-nowrap">
                                <p class="fs-1 mb-0 text-black"><?php echo $total_participantes; ?></p>
                                    <a class="text-reset text-decoration-none" href="../vista/reporte.php"><span class="mt-0 text-black">Participantes Totales</span></a>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#000000" class="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                </svg>
                            </div>
                            </div>

                        </div>

                        <div class="col-xl-3 col-md-6">

                            <div class="card shadow-lg" style="min-height: 100px; background-color: #fec868">
                            <div class="card-body d-flex justify-content-between align-items-center text-white">
                                <div class="d-flex flex-column">
                                <p class="fs-1 mb-0 text-black"><?php echo $total_formacion; ?></p>
                                    <a class="text-reset text-decoration-none" href="../vista/reporte.php"><span class="mt-0 text-black">P. En Formación</span></a>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#000000" class="bi bi-person-workspace" viewBox="0 0 16 16">
                                    <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                                    <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z"/>
                                </svg>
                            </div>
                            </div>

                        </div>
                        <div class="col-xl-3 col-md-6">

                            <div class="card shadow-lg" style="min-height: 100px; background-color: #97ecf1">
                            <div class="card-body d-flex justify-content-between align-items-center text-white">
                                <div>
                                <p class="fs-1 mb-0 text-black"><?php echo $total_cursos; ?></p>
                                    <a class="text-reset text-decoration-none" href="../vista/reporte.php"><span class="mt-0 text-black">Total Cursos</span></a>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#000000" class="bi bi-journal-check" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
                                </svg>
                            </div>
                            </div>

                        </div>
                        <div class="col-xl-3 col-md-6">

                            <div class="card shadow-lg" style="min-height: 100px; background-color: #BDB2FF">
                            <div class="card-body d-flex justify-content-between align-items-center text-white">
                                <div>
                                    <p class="fs-1 mb-0 text-black"><?php echo $total_docentes; ?></p>
                                    <a class="text-reset text-decoration-none" href="../vista/reporte.php"><span class="mt-0 text-black">Total Docentes</span></a>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#000000" class="bi bi-mortarboard-fill" viewBox="0 0 16 16">
                                    <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z"/>
                                    <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z"/>
                                </svg>
                            </div>
                            </div>

                        </div>

                    </div>




                    <!-- Gráficas -->
                    <div class="row mt-4 mx-2">
                        <div class="col-xl-6">
                            <div class="card shadow-lg">
                                <div class="card-header text-white text-center" style="background-color: #020d19;">
                                    Estudiantes Por Estatus
                                </div>
                                <div class="card-body">
                                    <canvas class="text-center" id="myChart" style="max-height: 58vh;"></canvas>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <div class="card shadow-lg">
                                <div class="card-header text-white text-center" style="background-color: #020d19;">
                                    Estudiantes por Género en Formación
                                </div>
                                <div class="card-body">
                                <canvas id="myPieChart" style="max-height: 58vh;"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>

            </div>

        </div>
    </div>
    
    <script src="../../assets/js/home.js"></script>
    <script src="../../assets/js/chart.js"></script>
    <script src="../../assets/js/grafica.js"></script>


    <script>
        var labels = <?php echo json_encode($labels); ?>;
var data = <?php echo json_encode($data); ?>;

document.addEventListener("DOMContentLoaded", function() {
    var ctx = document.getElementById("myChart");

    var staticColors = ['#28a745', '#dc3545', '#ffc107', '#007bff'];

    function randomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    var backgroundColors = [...staticColors];
    var remainingColorsCount = labels.length - staticColors.length;

    if (remainingColorsCount > 0) {
        for (var i = 0; i < remainingColorsCount; i++) {
            backgroundColors.push(randomColor());
        }
    }

    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
            }],
        },
        options: {
            plugins: {
                title: {
                    display: false,
                }
            }
        }
    });
});

        var generoData = {
            masculino: <?php echo $masculino; ?>,
            femenino: <?php echo $femenino; ?>
        };

        const userRole = "<?php echo $_SESSION['rol'] ?? ''; ?>";

if (userRole === "Apoyo") {
    const usuarioItem = document.getElementById('sidebar-usuario');
    if (usuarioItem) {
        usuarioItem.remove();
    }
}

    </script>
</body>
</html>