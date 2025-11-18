<!-- Modal Editar Participante -->
<div class="modal fade" id="modal-editParticipante" tabindex="-1" aria-hidden="true" aria-labelledby="label-modal-editParticipante">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <div class="d-flex justify-content-center align-items-center w-100">
                    <h4 class="modal-title text-center">Editar Participante</h4>
                </div>
                <button class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
           
            <div class="modal-body">
                <section>
                    <form id="form-editar-participante" class="row g-3 needs-validation" method="POST">
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
                               
                        <div class="col-md-6">
                            <label for="telefono-Edit" class="form-label">Teléfono</label>
                            <input class="form-control form-control-sm"  type="text" id="telefono-Edit" name="telefono" required>
                            <div class="error-feedback text-danger" id="error-telefono-Edit"></div>
                        </div>
                            
                        <div class="col-md-6 mb-2">
                            <label for="fechaNacimiento-Edit" class="form-label">Fecha de Nacimiento</label>
                            <input type="date" class="form-control form-control-sm" id="fechaNacimiento-Edit" name="fechaNacimiento" required>
                            <div class="error-feedback text-danger" id="error-fechaNacimiento-Edit"></div>
                        </div>

                        <!-- Cambiar sección de género -->
<div class="col-md-6 mb-1">
    <label class="form-label">Género</label>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="genero" id="genero_masculino" value="Masculino" required>
        <label class="form-check-label" for="genero_masculino">Masculino</label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="genero" id="genero_femenino" value="Femenino" required>
        <label class="form-check-label" for="genero_femenino">Femenino</label>
    </div>
    <div class="error-feedback text-danger" id="error-genero"></div>
</div>

<!-- Actualizar select de grado -->
<div class="col-md-12 mb-2">
    <label for="grado_institucion" class="form-label">Grado de Instrucción</label>
    <select class="form-select form-select-sm" id="grado_institucion" name="grado_institucion" required>
        <option value="Primaria">Primaria</option>
        <option value="Bachillerato">Bachillerato</option>
        <option value="Universidad">Universidad</option>
    </select>
    <div class="error-feedback text-danger" id="error-grado_institucion"></div>
</div>

                        <div class="col-12 mb-2">
                            <label for="correo-Edit" class="form-label">Correo Electrónico</label>
                            <input type="email" class="form-control form-control-sm" id="correo-Edit" name="correo" required>
                            <div class="error-feedback text-danger" id="error-correo-Edit"></div>
                        </div>
                               
                               

                        <!-- Agregar un campo oculto en el formulario -->
<input type="hidden" id="idParticipante" name="id_participante" value="">
                               
                        <div class="col-12">
                            <button class="btn-submmit text-white" type="submit">Actualizar datos del participante</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    </div>
</div>

