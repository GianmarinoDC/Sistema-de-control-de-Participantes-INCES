<!-- Modal Asignar Curso Docente -->
<div class="modal fade" id="modal-AsignarCursoDocente" tabindex="-1" aria-hidden="true" aria-labelledby="label-modal-Asignar-CursoDocente">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header text-white" style="background-color: #020d19;">
                <h5 class="modal-title" id="label-modal-Asignar-CursoDocente">
                    <i class="bi bi-journal-plus me-2"></i> Asignar Curso al Docente
                </h5>
                <button class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">

                <form id="formAsignarCursoDocente" class="needs-validation" novalidate>
                    <input type="hidden" id="id_docente" name="id_docente">

                    <!-- Datos del docente -->
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <p><b>Nombre:</b> <span id="asignar-nombre-docente"></span></p>
                            <p><b>Cédula:</b> <span id="asignar-cedula-docente"></span></p>
                        </div>
                        <div class="col-md-6">
                            <p><b>Apellido:</b> <span id="asignar-apellido-docente"></span></p>
                            <p><b>Email:</b> <span id="asignar-correo-docente"></span></p>
                        </div>
                    </div>

                    <!-- Cursos disponibles -->
                    <div class="mb-4">
                        <label for="asignarCursoDocente" class="form-label"><b>Cursos Disponibles</b></label>
                        <select class="form-select" id="asignarCursoDocente" name="curso" required>
                            <option value="" disabled selected>Cargando cursos disponibles...</option>
                        </select>
                        <div class="invalid-feedback">Por favor seleccione un curso.</div>
                    </div>
                </form>

                <!-- Cursos asignados -->
                <hr class="my-4">
                <div>
                    <h5><i class="bi bi-list-check me-2"></i> Cursos Asignados</h5>
                    <div id="cursos-asignados" class="mt-3">
                        <!-- Se insertan dinámicamente -->
                    </div>
                </div>
            </div>

            <!-- Botones al final del modal -->
            <div class="modal-footer">
                <button type="button" class="cancel-modal" data-bs-dismiss="modal">
                     Cerrar
                </button>
                <button type="submit" form="formAsignarCursoDocente" class="btn btn-success" style="height: 35px;">
                     Guardar Asignación
                </button>
            </div>
        </div>
    </div>
</div>
