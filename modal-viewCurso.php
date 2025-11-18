<div class="modal fade" id="modal-viewCurso" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content shadow-lg" >
      <div class="modal-header text-white" style="background-color: #020d19;">
        <h4 class="modal-title w-100 text-center" >Detalles del Curso</h4>
        <button class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>

      <div class="modal-body">
        <div class="row g-4">
          <!-- Información del Curso -->
          <div class="col-md-6">
            <div class="info-card bg-light p-4 rounded-3">
              <h5 class="mb-3" style="color: #020d19;">Información Básica</h5>
              <p><span class="text-muted">Nombre:</span> <span id="nombre-view" class="fw-bold float-end">-</span></p>
              <p><span class="text-muted">Programa:</span> <span id="programaFormación-view" class="float-end">-</span></p>
              <p><span class="text-muted">Modalidad:</span> <span id="modalidad-view" class="float-end">-</span></p>
              <p><span class="text-muted">Turno:</span> <span id="turno-view" class="float-end">-</span></p>
              <p><span class="text-muted">Tipo de Formación:</span> <span id="tipoFormacion-view" class="float-end">-</span></p>
              <p><span class="text-muted">Motor:</span> <span id="motor-view" class="float-end">-</span></p>
              <p><span class="text-muted">Área:</span> <span id="areaFormativa-view" class="float-end">-</span></p>
              <p><span class="text-muted">Sector Económico:</span> <span id="sectorEconomico-view" class="float-end">-</span></p>
              <p><span class="text-muted">Ámbito:</span> <span id="ambito-view" class="float-end">-</span></p>
              <p><span class="text-muted">Cupos Creados:</span> <span id="cupos-view" class="float-end">-</span></p>
            </div>
          </div>

          <!-- Progreso y Docente -->
          <div class="col-md-6">
            <div class="progress-section bg-light p-4 rounded-3">
              <!-- Progreso Circular -->
              <div class="d-flex justify-content-center mb-4">
                <div class="progress-circle position-relative" style="width: 120px; height: 120px;">
                  <svg class="progress-svg" viewBox="0 0 100 100">
                    <circle class="progress-bg" cx="50" cy="50" r="45"/>
                    <circle class="progress-bar" cx="50" cy="50" r="45" id="progress-circle"/>
                  </svg>
                  <div class="position-absolute top-50 start-50 translate-middle text-center">
                    <span id="circle-text" class="h4 mb-0">-</span>
                    <small class="d-block text-muted">Cupo</small>
                  </div>
                </div>
              </div>

              <!-- Barra de Progreso -->
              <div class="temporal-progress">
                <div class="d-flex justify-content-between mb-2">
                  <small id="fechaInicio-view">-</small>
                  <small id="fechaCulminación-view">-</small>
                </div>
                <div class="progress" style="height: 8px;">
                  <div id="progress-bar" class="progress-bar bg-success" role="progressbar" style="width: 0%;"></div>
                </div>
                <div class="mt-2 text-center">
                  <span class="badge" id="estadoCurso-view">-</span>
                </div>
              </div>
            </div>

            <!-- Docente -->
            <div class="teacher-info bg-light p-4 mt-4 rounded-3">
              <h5 class="mb-3" style="color: #020d19;">Docente</h5>
              <p><span class="text-muted">Nombre:</span> <span id="docente-nombre" class="float-end">-</span></p>
              <p><span class="text-muted">Cédula:</span> <span id="docente-cedula" class="float-end">-</span></p>
              <p><span class="text-muted">Edad:</span> <span id="docente-edad" class="float-end">-</span></p>
            </div>
          </div>
        </div>

        <!-- Participantes -->
        <div class="participants-table mt-4">
          <h5 class="mb-3">Participantes</h5>
          <div class="table-responsive">
            <table class="table table-hover align-middle">
              <thead class="table-light">
                <tr>
                  <th>Cédula</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Edad</th>
                  <th>Sexo</th>
                </tr>
              </thead>
              <tbody id="tabla-participantes"></tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="modal-footer">
      <button type="button"  class="cancel-modal" data-bs-dismiss="modal" style="height: 38px;">
        Cerrar
    </button>
        <button class="btn btn-danger" id="btn-matricula-pdf" data-id="">Descargar Matrícula</button>
      </div>
    </div>
  </div>
</div>
