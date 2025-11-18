<!-- Modal Ver Usuario -->
<div class="modal fade" id="modal-viewUsuario" tabindex="-1" aria-labelledby="label-modal-viewUsuario" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content shadow-lg rounded-4">

      <div class="modal-header text-white rounded-top-4" style="background-color: #020d19;">
        <h5 class="modal-title">Detalles del Usuario</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>

      <div class="modal-body p-4">
        <div class="text-center mb-4">
          <img id="avatar" class="rounded-circle shadow-sm border border-2 border-primary" alt="Avatar del usuario" width="100" height="100">
        </div>

        <div class="row g-2">
          <div class="col-6"><strong>Nombre:</strong></div>
          <div class="col-6" id="nombre-view"></div>

          <div class="col-6"><strong>Apellido:</strong></div>
          <div class="col-6" id="apellido-view"></div>

          <div class="col-6"><strong>Usuario:</strong></div>
          <div class="col-6" id="nombre_usuario-view"></div>

          <div class="col-6"><strong>Correo:</strong></div>
          <div class="col-6" id="correo-view"></div>

          <div class="col-6"><strong>Rol:</strong></div>
          <div class="col-6" id="rol-view"></div>

          <div class="col-6"><strong>Estado:</strong></div>
          <div class="col-6" id="estado-view"></div>
        </div>
      </div>
    </div>
  </div>
</div>
