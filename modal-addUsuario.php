<!-- Modal Agregar Usuario -->
<div class="modal fade" id="modal-addUsuario" tabindex="-1" aria-hidden="true" aria-labelledby="label-modal-addUsuario">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">

            <div class="modal-header">
                <div class="d-flex justify-content-center align-items-center w-100">
                    <h4 class="modal-title text-center">Registrar Nuevo Usuario</h4>
                </div>
                <button class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>

            <div class="modal-body">
                <section>
                    <form id="form-usuario" class="row g-3 needs-validation" method="POST" action="/Sistema%20de%20Control%20de%20Participantes/app/controlador/Usuario/cargarUsuario.php" enctype="multipart/form-data">
                        
                        <div class="col-md-6 mb-2">
                            <label for="nombre" class="form-label">Nombres</label>
                            <input class="form-control form-control-sm" type="text" name="nombre" id="nombre" required>
                            <div class="error-feedback text-danger" id="error-nombre"></div>
                        </div>

                        <div class="col-md-6 mb-2">
                            <label for="apellido" class="form-label">Apellidos</label>
                            <input class="form-control form-control-sm" type="text" id="apellido" name="apellido" required>
                            <div class="error-feedback text-danger" id="error-apellido"></div>
                        </div>

                        <div class="col-md-6 mb-2">
                            <label for="nombre_usuario" class="form-label">Nombre de Usuario</label>
                            <input class="form-control form-control-sm" type="text" name="nombre_usuario" id="nombre_usuario" required>
                            <div class="error-feedback text-danger" id="error-nombre_usuario"></div>
                        </div>

                        <div class="col-md-6">
                            <label for="password" class="form-label">Contraseña</label>
                            <input class="form-control form-control-sm" type="password" id="password" name="password" required>
                            <div class="error-feedback text-danger" id="error-password"></div>
                        </div>

                        <div class="col-12 mb-2">
                            <label for="correo" class="form-label">Correo Electrónico</label>
                            <input type="email" class="form-control form-control-sm" id="correo" name="correo" required>
                            <div class="error-feedback text-danger" id="error-correo"></div>
                        </div>

                        <div class="col-md-6 mb-2">
                            <label for="rol" class="form-label">Rol</label>
                            <select class="form-select form-select-sm" id="rol" name="rol" required>
                                <option value="">Seleccione</option>
                                <option value="Administrador">Administrador</option>
                                <option value="Apoyo">Apoyo</option>
                            </select>
                            <div class="error-feedback text-danger" id="error-rol"></div>
                        </div>

                       <div class="col-md-6 mb-2">
                       <label for="estado_usuario" class="form-label">Estado</label>
<select class="form-select form-select-sm" id="estado_usuario" name="estado_usuario" required>
    <option value="" selected>Seleccione</option>
    <option value="Activo">Activo</option>
    <option value="Inactivo">Inactivo</option>
</select>
                       </div>


                        <div class="col-md-12 mb-2">
    <label for="imagen" class="form-label">Foto de Perfil</label>
    <input class="form-control form-control-sm" type="file" name="imagen" id="imagen">
    <div class="form-text text-muted">Si no seleccionas una imagen, se asignará una por defecto.</div>
    <div class="error-feedback text-danger" id="error-imagen"></div>
</div>



                        <div class="col-12">
                            <button id="actualizar-tabla" class="btn-submmit text-white" type="submit">Registrar Nuevo Usuario</button>
                        </div>
                    </form>
                </section>
            </div>

        </div>
    </div>
</div>