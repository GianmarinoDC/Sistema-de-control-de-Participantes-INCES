<!-- Modal Ver Participante -->
<div class="modal fade" id="modal-viewParticipante" tabindex="-1" aria-labelledby="labelModalParticipante" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header text-white" style="background-color: #020d19;">
                <h5 class="modal-title" id="labelModalParticipante">
                    Información del Participante
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>

            <div class="modal-body">
                <!-- Sección Datos Personales -->
                <div class="modal-section mb-4">
                    <h5 class="fw-bold mb-3" style="color: #020d19;">
                        Datos Personales
                    </h5>
                    <div class="row">
                        <div class="col-md-6">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <span><b>Nombre:</b></span>
                                    <span id="nombre-view" class="text-muted">-</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <span><b>Cédula:</b></span>
                                    <span id="cedula-view" class="text-muted">-</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <span><b>Fecha Nacimiento:</b></span>
                                    <span id="fechaNacimiento-view" class="text-muted">-</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <span><b>Teléfono:</b></span>
                                    <span id="telefono-view" class="text-muted">-</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <span><b>Grado Instrucción:</b></span>
                                    <span id="gradoInstruccion-view" class="text-muted">-</span>
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <span><b>Apellido:</b></span>
                                    <span id="apellido-view" class="text-muted">-</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <span><b>Edad:</b></span>
                                    <span id="edad-view" class="text-muted">-</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <span><b>Correo:</b></span>
                                    <span id="correo-view" class="text-muted">-</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <span><b>Sexo:</b></span>
                                    <span id="sexo-view" class="text-muted">-</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <span><b>Fecha Registro:</b></span>
                                    <span id="fechaRegistro-view" class="text-muted">-</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                               <!-- Sección Cursos Activos -->
                               <div class="modal-section mb-4">
                    <h5 class="fw-bold mb-3" style="color: #020d19;">
                        Cursos Activos
                    </h5>
                    <div class="alert alert-info p-3">
                        <div class="row g-3" id="cursos-activos-container">
                            <!-- Contenido dinámico desde JS -->
                        </div>
                        <div id="sin-cursos" class="text-muted fst-italic mt-2" style="display: none;">
                            <i class="bi bi-info-circle me-2"></i>No tiene cursos activos actualmente
                        </div>
                    </div>
                </div>

                       <!-- Sección Historial -->
    <div class="modal-section">
        <h5 class="fw-bold mb-3" style="color: #020d19;">
            </i>Historial Académico
        </h5>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead class="table-light">
                    <tr>
                        <th>Curso</th>
                        <th>Fecha Inscripción</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody id="historial-content">
                    
                </tbody>
            </table>
        </div>
    </div>

    <div class="modal-footer justify-content-between">
    <div class="d-flex gap-2">
        <a id="btn-historial-participante" target="_blank" class="btn btn-success" data-id="" style="height: 38px;">
            Historial Participante PDF
        </a>
        <a id="btn-constancia-participante" target="_blank" class="btn btn-danger" data-id="" style="height: 38px;">
            Generar Constancia
        </a>
    </div>
    <button type="button"  class="cancel-modal" data-bs-dismiss="modal" style="height: 38px;">
        Cerrar
    </button>
</div>
        </div>
    </div>
</div>