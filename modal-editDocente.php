<!-- Modal Editar Docente -->
<div class="modal fade" id="modal-editDocente" tabindex="-1" aria-hidden="true" aria-labelledby="label-modal-editDocente">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
           
            <div class="modal-header">
                <div class="d-flex justify-content-center align-items-center w-100">
                    <h4 class="modal-title text-center">Editar Docente</h4>
                </div>
                <button class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
           
            <div class="modal-body">
                <section>
                    <form id="form-editar-docente" class="row g-3 needs-validation" method="POST">

                        <div class="modal-section-title">Datos Personales</div>

                        <div class="col-md-6 mb-2">
                            <label for="cedula-Edit" class="form-label">Cédula</label>
                            <input class="form-control form-control-sm" type="number" name="cedula" id="cedula-Edit" required>
                            <div class="error-feedback text-danger" id="error-cedula-Edit"></div>
                        </div>

                        
                        <div class="col-md-6 mb-2">
                            <label for="nombre-Edit" class="form-label">Nombres</label>
                            <input class="form-control form-control-sm" type="text" name="nombre" id="nombre-Edit" required>
                            <div class="error-feedback text-danger" id="error-nombre-Edit"></div>
                        </div>

                        <div class="col-md-6 mb-2">
                            <label for="apellido-Edit" class="form-label">Apellidos</label>
                            <input class="form-control form-control-sm" type="text" id="apellido-Edit" name="apellido" required>
                            <div class="error-feedback text-danger" id="error-apellido-Edit"></div>
                        </div>


                        <div class="col-6">
                            <label for="telefono-Edit" class="form-label">Teléfono</label>
                            <input class="form-control form-control-sm" type="number" id="telefono-Edit" name="telefono" required>
                            <div class="error-feedback text-danger" id="error-telefono-Edit"></div>
                        </div>

                        <div class="col-md-6 mb-2">
                            <label for="fechaNacimiento-Edit" class="form-label">Fecha de Nacimiento</label>
                            <input type="date" class="form-control form-control-sm" id="fechaNacimiento-Edit" name="fechaNacimiento" required>
                            <div class="error-feedback text-danger" id="error-fechaNacimiento-Edit"></div>
                        </div>

                        <div class="col-md-6 mb-1">
                            <label class="form-label">Sexo</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="id_genero" id="genero_m-Edit" value="Masculino" required>
                                <label class="form-check-label" for="genero_m-Edit">Masculino</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="id_genero" id="genero_f-Edit" value="Femenino" required>
                                <label class="form-check-label" for="genero_f-Edit">Femenino</label>
                            </div>
                            <div class="error-feedback text-danger" id="error-id_genero-Edit"></div>
                        </div>

                        <div class="col-12 mb-2">
                            <label for="correo-Edit" class="form-label">Correo Electrónico</label>
                            <input type="email" class="form-control form-control-sm" id="correo-Edit" name="correo" required>
                            <div class="error-feedback text-danger" id="error-correo-Edit"></div>
                        </div>

                        <!-- Campo oculto para ID del docente -->
                        <input type="hidden" id="idDocente" name="id_docente">

                        <div class="col-12">
                            <button class="btn-submmit text-white" type="submit">Actualizar datos del docente</button>
                        </div>
                    </form>
                </section>
            </div>
           
        </div>
    </div>
</div>