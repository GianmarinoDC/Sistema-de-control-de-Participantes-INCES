<!-- Modal Agregar Docente -->
<div class="modal fade" id="modal-addDocente" tabindex="-1" aria-hidden="true" aria-labelledby="label-modal-addDocente">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">

            <div class="modal-header">
                <div class="d-flex justify-content-center align-items-center w-100">
                    <h4 class="modal-title text-center">Registrar Nuevo Docente</h4>
                </div>
                <button class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>

            <div class="modal-body">
                <section>
                    <form id="form-docente" class="row g-3 needs-validation form-docente" method="POST" action="/Sistema%20de%20Control%20de%20Participantes/app/controlador/Docente/CargarDocente.php">

                        <div class="modal-section-title">Datos Personales</div>

                        <div class="col-md-6 mb-2">
                            <label for="cedula" class="form-label">Cédula</label>
                            <input class="form-control form-control-sm" type="number" name="cedula" id="cedula" required>
                            <div class="error-feedback text-danger" id="error-cedula"></div>
                        </div>

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

                        <div class="col-6">
                            <label for="telefono" class="form-label">Teléfono</label>
                            <input class="form-control form-control-sm" type="number" id="telefono" name="telefono" required>
                            <div class="error-feedback text-danger" id="error-telefono"></div>
                        </div>

                        <div class="col-md-6 mb-2">
                            <label for="fechaNacimiento" class="form-label">Fecha de Nacimiento</label>
                            <input type="date" class="form-control form-control-sm" id="fechaNacimiento" name="fechaNacimiento" required>
                            <div class="error-feedback text-danger" id="error-fechaNacimiento"></div>
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="id_genero" class="form-label">Sexo</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="id_genero" id="id_genero" value="1" required>
                                <label class="form-check-label" for="masculino">Masculino</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="id_genero" id="id_genero" value="2" required>
                                <label class="form-check-label" for="femenino">Femenino</label>
                            </div>
                            <div class="error-feedback text-danger" id="error-id_genero"></div>
                        </div>

                        <div class="col-12 mb-2">
                            <label for="correo" class="form-label">Correo Electrónico</label>
                            <input type="email" class="form-control form-control-sm" id="correo" name="correo" required>
                            <div class="error-feedback text-danger" id="error-correo"></div>
                        </div>

                        <!-- Campos ocultos existentes (sin modificar) -->
                        <div class="col-md-6 mb-2" style="display:none;">
                            <label for="id_estado" class="form-label">Estado</label>
                            <select class="form-select form-select-sm" id="id_estado" name="id_estado" readonly required>
                                <option value="" selected>Seleccione</option>

                            </select>
                            <div class="error-feedback text-danger" id="error-id_estado"></div>
                        </div>

                        <div class="col-12">
                            <button id="actualizar-tabla" class="btn-submmit text-white" type="submit">Registrar Nuevo Docente</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    </div>
</div>