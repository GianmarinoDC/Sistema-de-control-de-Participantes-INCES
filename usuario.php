<?php

// Incluir la conexión
require_once '../modelo/conexion.php';

session_start();

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Redirigir al login si no hay sesión activa
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header('Location: index.php');
    exit;
}

// Crear instancia de conexión
$conexion = new Conexion();
$conn = $conexion->getConexion();


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
    <link rel="stylesheet" href="../../assets/css/toastr.min.css">
    <link rel="stylesheet" href="../../assets/css/home.css">
    <link rel="stylesheet" href="../../assets/css/crud.css">
    <link rel="stylesheet" href="../../assets/css/user.css">
    <title>Control</title>

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
                <li class="sidebar-item">
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
                    <h1 class="ps-3">Usuarios </h1>
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
            <div class="contenedor">
                    
            <div class="box d-flex justify-content-center flex-column shadow-lg px-3 mt-4">
              
              <!-- Barra de búsqueda -->
              <div class="d-flex justify-content-between align-items-center mt-4">
                <form class="input-group search-bar">
                    <input 
                        type="text" 
                        id="searchInput"
                        onkeyup="buscarUsuario()" 
                        class="form-control form-control-sm" 
                        placeholder="Buscar...">
                    <span class="input-group-text">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                      </svg>
                    </span>
                </form>
            </div>

                <div class="filters-container d-flex justify-content-between pt-2">
                        <!-- Filtros -->
                        <form class="d-flex align-items-center gap-2">
                            <label class="label" for="sexo">Rol:</label>
                                <select class="form-select form-select-sm" name="rol" id="rol-filter">
                                <option value="">Todos</option>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Apoyo">Apoyo</option>
                                </select>
         
                            <label class="label" for="estado">Estado:</label>
                                <select class="form-select form-select-sm" name="estado" id="estado-filter">
                                <option value="">Todos</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                                </select>


                            <button class="filter" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" class="bi bi-filter" viewBox="0 0 16 16">
                              <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
                            </svg></button>
                        </form>

                        <!-- Botón para agregar Usuarios-->
                        <a href="#" class="btn-add d-flex justify-content-center align-items-center gap-3 text-white" data-bs-toggle="modal" data-bs-target="#modal-addUsuario">Agregar Usuarios<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" class="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                          </svg></a>
    
                </div>
                    <!-- Tabla de estudiantes -->
                    <div class="table-responsive">
                        <table id="tabla-usuarios" class="table rounded-5 mt-4">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Nombre Usuario</th>
                                    <th>Correo</th>
                                    <th>Rol</th>
                                    <th>Estado</th>
                                    <th>Avatar</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                    
                            </tbody>
                        </table>
                    </div>
                    <!-- Paginación -->

<div class="d-flex justify-content-between align-items-center">

<div class="registros-container d-flex align-items-center gap-2">
        <label class="label">Mostrar</label>
        <select class="form-select form-select form-select-sm" id="registros">
        <option value="1">1</option>
          <option value="5">5</option>
          <option value="8" selected>8</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="Todos">Todos</option>
        </select>
        <span class="label">Registros</span>
      </div>

    <nav aria-label="Page navigation" class="mt-1">
        <ul class="pagination pagination-sm">
          <li class="page-item">
            <a class="page-link" href="#">Primero</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">Anterior</a>
          </li>
          <li class="page-item active" aria-current="page">
            <a class="page-link" href="#">1</a>
          </li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">4</a></li>
          <li class="page-item"><a class="page-link" href="#">5</a></li>
          <li class="page-item">
            <a class="page-link" href="#">Siguiente</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">Último</a>
          </li>
        </ul>
      </nav>
    
</div>
    
   
 
</div
 

    <?php include '../modales/Usuario/modal-addUsuario.php'; ?>
    <?php include '../modales/Usuario/modal-viewUsuario.php'; ?>
    <?php include '../modales/Usuario/modal-editUsuario.php'; ?>
    <?php include '../modales/Usuario/modal-deleteUsuario.php'; ?>


    <script src="../../assets/js/jquery-3.7.1.min.js"></script>
    <script src="../../assets/js/bootstrap.bundle.min.js"></script>
    <script src="../../assets/js/toastr/toastr.min.js"></script>
    <script src="../../assets/js/toastr/toastr-config.js"></script>
    <script src="../../assets/js/home.js"></script>
    <script src="../../assets/js/Usuario/tabla-usuarios.js"></script>
    <script src="../../assets/js/Usuario/editarUsuario.js"></script>
    <script src="../../assets/js/Usuario/viewUsuario.js"></script>
    <script src="../../assets/js/Usuario/eliminarUsuario.js"></script>
    <script src="../../assets/js/Usuario/filtrosUsuarios.js"></script>
    <script src="../../assets/js/Usuario/paginacionUsuario.js"></script>
    <script src="../../assets/js/Usuario/buscarUsuario.js"></script>

</body>
</html>