<!-- Modal Editar Usuario -->
<div class="modal fade" id="modal-editUsuario" tabindex="-1" aria-hidden="true" aria-labelledby="label-modal-editUsuario">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
           
            <div class="modal-header">
                <div class="d-flex justify-content-center align-items-center w-100">
                    <h4 class="modal-title text-center">Editar Usuario</h4>
                </div>
                <button class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
           
            <div class="modal-body">
                <section>
                    <form id="form_editUsuario" class="row g-3 needs-validation" novalidate method="POST" enctype="multipart/form-data">
                        <div class="col-md-6 mb-2">
                            <label for="nombre" class="form-label">Nombres</label>
                            <input class="form-control form-control-sm" type="text" name="nombre" id="nombre-Edit" required>
                            <div class="invalid-feedback" id="error-nombre-edit"></div>
                        </div>
                               
                        <div class="col-md-6 mb-2">
                            <label for="apellido" class="form-label">Apellidos</label>
                            <input class="form-control form-control-sm" type="text" id="apellido-Edit" name="apellido" required>
                            <div class="invalid-feedback" id="error-apellido-edit"></div>
                        </div>
                               
                        <div class="col-md-6 mb-2">
                            <label for="nombre_usuario" class="form-label">Nombre de Usuario</label>
                            <input class="form-control form-control-sm" type="text" name="nombre_usuario" id="nombre_usuario-Edit" required>
                            <div class="invalid-feedback" id="error-nombre_usuario-edit"></div>
                        </div>

                        <div class="col-md-6">
                            <label for="contraseña" class="form-label">Contraseña</label>
                            <input class="form-control form-control-sm" type="password" id="password-Edit" name="password" placeholder="Dejar vacío para no cambiar">
                            <div class="invalid-feedback" id="error-password-edit"></div>
                        </div>
                               
                        <div class="col-md-6 mb-2 d-flex flex-column justify-content-center">
    <label for="rol" class="form-label">Rol</label>
    <select class="form-select form-select-sm" id="rol-Edit" name="rol" required>
        <option value="Administrador">Administrador</option>
        <option value="Apoyo">Apoyo</option>
    </select>
    <div class="invalid-feedback" id="error-rol-edit"></div>
</div>

<div class="col-md-6 mb-2 d-flex flex-column justify-content-center">
    <label for="estado_usuario-Edit" class="form-label">Estado</label>
    <select class="form-select form-select-sm" id="estado_usuario-Edit" name="estado_usuario" required>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
    </select>
    <div class="invalid-feedback" id="error-estado-edit"></div>
</div>


                        <div class="col-12 mb-2">
                            <label for="correo" class="form-label">Correo Electrónico</label>
                            <input type="email" class="form-control form-control-sm" id="correo-Edit" name="correo" required>
                            <div class="invalid-feedback" id="error-correo-edit"></div>
                        </div>
                        
                        <div class="col-12 mb-2">
                            <label for="imagen" class="form-label">Avatar actual del usuario</label><br>
                            <img id="avatarUsuario" alt="Avatar del usuario" class="rounded-circle mb-2" width="80" height="80">
                            <input class="form-control form-control-sm" type="file" name="imagen" id="imagen-Edit" accept="image/jpeg, image/png, image/gif">
                            <div class="invalid-feedback" id="error-imagen-edit"></div>
                        </div>

                        <!-- Campos ocultos -->
                        <input type="hidden" name="imagen_actual" id="imagen_actual-Edit">
                        <input type="hidden" id="idUsuario" name="id_usuario">
                               
                        <div class="col-12">
                            <button class="btn-submmit text-white" type="submit">Actualizar datos del Usuario</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    </div>
</div>