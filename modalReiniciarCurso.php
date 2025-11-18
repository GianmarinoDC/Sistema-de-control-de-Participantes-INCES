<div class="modal fade" id="modalReiniciarCurso" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header text-white" style="background-color: #020d19;">
        <h5 class="modal-title">Reiniciar Curso</h5>
        <button type="button" class="btn-close btn-cancel-reiniciar" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="formReiniciarCurso">
          <input type="hidden" id="reiniciarCursoId">
          <div class="mb-3">
            <label for="nuevaFechaInicio" class="form-label">Nueva Fecha de Inicio</label>
            <input type="date" class="form-control" id="nuevaFechaInicio" required>
            <div class="text-danger" id="errorFechaInicio" style="display: none;"></div>
          </div>
          <div class="mb-3">
            <label for="nuevaFechaFin" class="form-label">Nueva Fecha de Finalización</label>
            <input type="date" class="form-control" id="nuevaFechaFin" required>
            <div class="text-danger" id="errorFechaFin" style="display: none;"></div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn  btn-cancel-reiniciar cancel-modal">Cancelar</button>
        <button type="button" class="btn text-white" id="confirmarReinicioCurso" style="background-color: #0A369D;">Reiniciar Curso</button>
      </div>
    </div>
  </div>
</div>
