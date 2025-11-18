<!-- Modal Ver Docente -->
<div class="modal fade" id="modal-viewDocente" tabindex="-1" aria-hidden="true" aria-labelledby="label-modal-viewDocente">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content shadow-lg rounded-3">

            <div class="modal-header text-white" style="background-color: #020d19;">
                <h4 class="modal-title w-100 text-center" id="label-modal-viewDocente"> Detalles del Docente</h4>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>

            <div class="modal-body">
                <!-- Datos Personales -->
                <div class="mb-4">
                    <h5 class="text-secondary border-bottom pb-2"> Datos Personales</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <p><strong>Nombre:</strong> <span id="nombre-view"></span></p>
                            <p><strong>Apellido:</strong> <span id="apellido-view"></span></p>
                            <p><strong>Cédula:</strong> <span id="cedula-view"></span></p>
                            <p><strong>Teléfono:</strong> <span id="telefono-view"></span></p>
                            <p><strong>Correo:</strong> <span id="correo-view"></span></p>
                        </div>
                        <div class="col-md-6">
                            <p><strong>Edad:</strong> <span id="edad-view"></span></p>
                            <p><strong>Fecha de nacimiento:</strong> <span id="fechaNacimiento-view"></span></p>
                            <p><strong>Género:</strong> <span id="sexo-view"></span></p>
                            <p><strong>Estado:</strong> Sucre</p>
                            <p><strong>Estado del Docente:</strong> <span id="estado-view" class="badge"></span></p>
                        </div>
                    </div>
                </div>

                <!-- Cursos Asociados -->
                <div>
                    <h5 class="text-secondary border-bottom pb-2"> Cursos Asociados</h5>
                    <div id="cursos-asociados" class="row gy-3">
                        <!-- Cards de cursos se inyectarán aquí -->
                    </div>
                </div>
            </div>

            <div class="modal-footer d-flex justify-content-between">
                <a id="btn-constanciaDocente-pdf" target="_blank">
                    <button class="btn btn-danger d-flex justify-content-center align-items-center gap-1" id="btn-constanciaDocente-pdf" target="_blank" data-id="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
                    <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                    </svg>
                    <span>Constancia</span>
                    </button>
                </a>
                <button type="button"  class="cancel-modal" data-bs-dismiss="modal" style="height: 38px;">
        Cerrar
    </button>
            </div>

        </div>
    </div>
</div>
