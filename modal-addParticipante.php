<div class="modal fade" id="modal-addParticipante" tabindex="-1" aria-hidden="true" aria-labelledby="label-modal-addParticipante">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">

            <div class="modal-header">
                <div class="d-flex justify-content-center align-items-center w-100">
                    <h4 class="modal-title text-center">Registrar Nuevo Participante</h4>
                </div>
                <button class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>

            <div class="modal-body">
                <section>
                    <form id="form-participante" class="row g-3" method="POST" action="../controlador/cargar.php">

                        <div class="modal-section-title">Datos Personales</div>

                        <div class="col-md-6 mb-2">
                            <label for="cedula" class="form-label">Cédula</label>
                            <input type="number" class="form-control form-control-sm" name="cedula" id="cedula" required>
                            <div class="error-feedback text-danger" id="error-cedula"></div>
                        </div>

                        <div class="col-md-6 mb-2">
                            <label for="nombre" class="form-label">Nombres</label>
                            <input type="text" class="form-control form-control-sm" name="nombre" id="nombre" required>
                            <div class="error-feedback text-danger" id="error-nombre"></div>
                        </div>

                        <div class="col-md-6 mb-2">
                            <label for="apellido" class="form-label">Apellidos</label>
                            <input type="text" class="form-control form-control-sm" name="apellido" id="apellido" required>
                            <div class="error-feedback text-danger" id="error-apellido"></div>
                        </div>

                        <div class="col-md-6 mb-2">
                            <label for="telefono" class="form-label">Teléfono</label>
                            <input type="number" class="form-control form-control-sm" name="telefono" id="telefono" required>
                            <div class="error-feedback text-danger" id="error-telefono"></div>
                        </div>

                        <div class="col-md-6 mb-2">
                            <label for="fechaNacimiento" class="form-label">Fecha de Nacimiento</label>
                            <input type="date" class="form-control form-control-sm" name="fechaNacimiento" id="fechaNacimiento" required>
                            <div class="error-feedback text-danger" id="error-fechaNacimiento"></div>
                        </div>

                        <div class="col-md-6 mb-2">
                            <label class="form-label">Sexo</label>
                            <div class="form-check">
                                <input type="radio" class="form-check-input" name="id_genero" id="id_genero1" value="Masculino" required>
                                <label class="form-check-label" for="id_genero1">Masculino</label>
                            </div>
                            <div class="form-check">
                                <input type="radio" class="form-check-input" name="id_genero" id="id_genero2" value="Femenino" required>
                                <label class="form-check-label" for="id_genero2">Femenino</label>
                            </div>
                            <div class="error-feedback text-danger" id="error-id_genero"></div>
                        </div>

                        <div class="modal-section-title">Datos Inscripción</div>
                        <div class="col-md-6 mb-2">
                            <label for="correo" class="form-label">Correo Electrónico</label>
                            <input type="email" class="form-control form-control-sm" name="correo" id="correo" required>
                            <div class="error-feedback text-danger" id="error-correo"></div>
                        </div>

                        <div class="col-md-6 mb-2">
                            <label for="id_gradoInstitucion" class="form-label">Grado de Instrucción</label>
                            <select class="form-select form-select-sm" name="id_gradoInstitucion" id="id_gradoInstitucion" required>
                                <option value="">Seleccione</option>
                                <?php

                                // Use the ENUM values directly
                                $grados = ['Primaria', 'Bachillerato', 'Universidad'];
                                foreach ($grados as $grado) {
                                    echo "<option value='" . $grado . "'>" . $grado . "</option>";
                                }
                                ?>
                            </select>
                            <div class="error-feedback text-danger" id="error-id_gradoInstitucion"></div>
                        </div>

                        <div class="col-md-12 mb-2">
    <label for="id_curso" class="form-label">Curso</label>
    <select class="form-select form-select-sm" name="id_curso" id="id_curso" required>
        <option value="">Cargando cursos...</option>
    </select>
    <div class="error-feedback text-danger" id="error-id_curso"></div>
</div>

                        <div class="col-md-6 mb-2" style="display: none;">
                            <label for="id_estado" class="form-label">Estado</label>
                            <select class="form-select form-select-sm" name="id_estado" id="id_estado" required>
                                <option value="">Seleccione</option>
                                <?php
                                // Use the ENUM values directly
                                $estados = ['En formación', 'Inactivo', 'En sistema', 'Asignado'];
                                foreach ($estados as $estado) {
                                    echo "<option value='" . $estado . "'>" . $estado . "</option>";
                                }
                                ?>
                            </select>
                            <div class="error-feedback text-danger" id="error-id_estado"></div>
                        </div>

                        <div class="col-12">
                            <button class="btn-submmit text-white" type="submit" id="submitBtn">Registrar Nuevo Participante</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    </div>
</div>