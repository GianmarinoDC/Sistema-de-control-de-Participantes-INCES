
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../assets/css/login.css">
    <title>INCES</title>
</head>
<body class="d-flex justify-content-center align-items-center vh-100">
    
<?php
session_start(); // Iniciar sesión al principio del archivo

?>
<!-- Contenedor Principal -->
<section class="container">
    <div class="row justify-content-center align-items-center gap-5">
        <!-- Login -->
        <div class="col-12 col-md-6 col-lg-5 rounded-3 bg-white shadow-lg container-login">
            <!-- Logo Grande del INCES -->
            <img class="inces__logo" src="../../assets/img/inces-logo.png" alt="Inces__logo">

            <!--Titulos Login-->
            <h2 class="text-center pt-1">Iniciar Sesión</h2>
            <p class="text-center pb-4 texto fs-6">INCES Industrial "Bolivariano</p>
            
            <!--Formulario-->
            <form action="../controlador/Usuario/login.php" method="POST">
                <!--Inputs-->
                <label class="pt-2 pb-1 text-color texto-input" for="">Usuario</label>
                <div class="d-flex justify-content-center align-items-center position-relative">
                    <input class="input w-100 rounded-1" type="text" name="nombre_usuario" placeholder="Introduzca su usuario" required>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#181818" class="bi bi-person-circle icon" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>
                </div>
                <label class="pt-4 pb-1 text-color texto-input" for="">Contraseña</label>
                <div class="d-flex justify-content-center align-items-center position-relative">
                    <input class="input w-100 rounded-1" type="password" name="contraseña" placeholder="Introduzca su contraseña" required>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#181818" class="bi bi-lock-fill icon" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
                    </svg>
                </div>

                <!-- Mostrar error debajo del input si existe -->
                <?php
                if (isset($_SESSION['error_login'])) {
                    echo "<div class='text-danger mt-2'>".htmlspecialchars($_SESSION['error_login'])."</div>";
                    unset($_SESSION['error_login']);
                }
                
                // Mostrar mensaje de logout exitoso
                if (isset($_GET['logout']) && $_GET['logout'] == '1') {
                    echo "<div class='alert alert-success mt-2'>Sesión cerrada correctamente</div>";
                }
                ?>
                
                <!-- Olvidaste tu contraseña-->
                <div class="row mt-4 w-100 d-flex justify-content-center">
                    <div class="col-6 text-start d-flex align-items-center">
                    <a class="text-primary text-decoration-none text-nowrap pt-1 texto text-password fs-6 " 
   href="RecuperarContraseñaindex.php">
   ¿Olvidaste tu contraseña?
</a>                    </div>
                </div>
                
                <!--Btn-->
                <button type="submit" class="w-100 p-2 mt-4 rounded-1 boton text-white fs-5">Iniciar Sesión</button>
                <p class="text-center texto pt-4 texto fs-6">Sistema de Control de Participantes</p>
            </form>
        </div>
        
        <!-- Imagen Login -->
        <div class="col-12 col-md-6 col-lg-6 img-extend rounded-4 d-none d-md-block"></div>
    </div>
</section>

</body>
</html>
