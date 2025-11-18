<!-- Modal Curso -->
<div class="modal fade" id="cursoModal" tabindex="-1" aria-labelledby="cursoModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content shadow-lg">
      <!-- Encabezado -->
      <div class="modal-header bg-gradient-primary text-white py-3" style="background-color: #020d19;"> 
        <h5 class="modal-title fs-5 d-flex align-items-center">
          <div>
            <span class="d-block">Gestión de Curso</span>
            <span id="modalCursoNombre" class="fw-bold fs-5"></span>
          </div>
        </h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <!-- Cuerpo -->
      <div class="modal-body p-0">
       
      <div id="cursoFinalizadoAlert" class="d-none"></div>


        <!-- Lista de participantes -->
        <div class="participantes-container p-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="mb-0 text-muted">
              <i class="fas fa-users me-2"></i>Lista de Estudiantes
            </h6>
            <span class="badge bg-primary rounded-pill" id="contadorEstudiantes">0 estudiantes</span>
          </div>
          
          <div class="list-group" id="listaParticipantes">
            <!-- Ejemplo de item -->
            <div class="list-group-item list-group-item-action d-flex align-items-center justify-content-between py-3">
              
            </div>
          </div>
        </div>
      </div>

      <!-- Pie del modal -->
<div class="modal-footer justify-content-between border-top px-4">
  <div class="d-flex gap-2">
    <button type="button" class="btn btn-danger btn-sm" id="btnFinalizar" style="height: 38px;">
      Finalizar Curso
    </button>
    <button type="button" class="btn btn-sm text-white" id="btnReiniciarCurso" disabled style="background-color: #0A369D; height: 38px;">
      Reiniciar Curso
    </button>
  </div>
  <div class="d-flex gap-2">
    <button type="button" class="btn btn-success btn-sm" id="btnGuardar">
      Guardar Cambios
    </button>
    <button type="button"  class="cancel-modal" data-bs-dismiss="modal" style="height: 38px;">
        Cerrar
    </button>
  </div>
</div>

    </div>
  </div>
</div>