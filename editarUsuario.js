function cargarTabla() {
    $.ajax({
        url: '../../app/controlador/Usuario/obtenerUsuarios.php',
        method: 'GET',
        dataType: 'json',
        success: function (data) {

            let rows = '';

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(participante => {
                    
// Clases de Bootstrap para rol con ancho mínimo de 300px
let rolBadgeClass = participante.rol === 'Administrador' ? 'badge bg-primary" style="min-width: 100px;' :
                 participante.rol === 'Apoyo' ? 'badge bg-secondary" style="min-width: 100px;' : 
                 'badge bg-secondary" style="min-width: 100px;';

// Clases de Bootstrap para estado con ancho mínimo de 300px
let estadoBadgeClass = participante.estado_usuario === 'Activo' ? 'badge bg-success" style="min-width: 70px;' :
                    participante.estado_usuario === 'Inactivo' ? 'badge bg-danger" style="min-width: 70px;' : 
                    'badge bg-secondary" style="min-width: 100px;';

                    rows += `
                        <tr>
                            <td>${participante.id_usuario}</td>
                            <td>${participante.nombre}</td>
                            <td>${participante.apellido}</td>
                            <td>${participante.nombre_usuario}</td>
                            <td>${participante.correo}</td>
                            <td><span class="${rolBadgeClass}">${participante.rol}</span></td>
                            <td><span class="${estadoBadgeClass}">${participante.estado_usuario}</span></td>
                            <td>
                            <img src="http://localhost/Sistema%20de%20Control%20de%20Participantes/${participante.imagen}" alt="Avatar" class="rounded-circle" width="50" height="50">
                            </td>
                            <td>
                                <!-- Botones de acción -->
                                <a href="#"><button class='button view' data-id="${participante.id_usuario}" data-bs-toggle='modal' data-bs-target='#modal-viewUsuario'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#fff' class='bi bi-binoculars' viewBox='0 0 16 16'>
                                <path d='M3 2.5A1.5 1.5 0 0 1 4.5 1h1A1.5 1.5 0 0 1 7 2.5V5h2V2.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5v2.382a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V14.5a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 14.5v-3a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5v3A1.5 1.5 0 0 1 5.5 16h-3A1.5 1.5 0 0 1 1 14.5V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882zM4.5 2a.5.5 0 0 0-.5.5V3h2v-.5a.5.5 0 0 0-.5-.5zM6 4H4v.882a1.5 1.5 0 0 1-.83 1.342l-.894.447A.5.5 0 0 0 2 7.118V13h4v-1.293l-.854-.853A.5.5 0 0 1 5 10.5v-1A1.5 1.5 0 0 1 6.5 8h3A1.5 1.5 0 0 1 11 9.5v1a.5.5 0 0 1-.146.354l-.854.853V13h4V7.118a.5.5 0 0 0-.276-.447l-.895-.447A1.5 1.5 0 0 1 12 4.882V4h-2v1.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm4-1h2v-.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm4 11h-4v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zm-8 0H2v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5z'/>
                                </svg></button></a>


                                <a href="#"><button class='button edit' data-id="${participante.id_usuario}" data-bs-toggle='modal' data-bs-target='#modal-editUsuario'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil' viewBox='0 0 16 16'>
                                <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325'/>
                                </svg></button></a>

                                <a href="#"><button class='button delete' data-id="${participante.id_usuario}" data-bs-toggle='modal' data-bs-target='#modal-deleteUsuario'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#fff' class='bi bi-trash' viewBox='0 0 16 16'>
                                <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z'/>
                                <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z'/>
                                </svg></button></a>
                            </td>
                        </tr>
                    `;
                    
                });
            } else if (data.error) {
                console.error("❌ Error del servidor:", data.message);
                rows = `<tr><td colspan="8" class="text-center">Error: ${data.message}</td></tr>`;
            } else {
                console.warn("⚠️ No hay usuarios registrados.");
                rows = '<tr><td colspan="8" class="text-center">No hay Usuarios registrados</td></tr>';
            }

            $('#tabla-usuarios tbody').html(rows);
        },
        error: function (xhr, status, error) {
            console.error("❌ Error en la solicitud AJAX:", error);
        }
    });
}


$(document).ready(function () {
    const $form = $('#form_editUsuario');
    
    // Declara las variables timeout
    let timeoutUsuario, timeoutCorreo;
    let currentUserId = null;

    // ==================== FUNCIONES DE VALIDACIÓN ====================
    function showError(fieldId, message) {
        $form.find(`#${fieldId}`).removeClass('is-valid').addClass('is-invalid');
        $form.find(`#error-${fieldId.split('-')[0]}-edit`).text(message).show();
    }

    function showValid(fieldId) {
        $form.find(`#${fieldId}`).removeClass('is-invalid').addClass('is-valid');
        $form.find(`#error-${fieldId.split('-')[0]}-edit`).text('').hide();
    }

    // ==================== VALIDACIONES EN TIEMPO REAL ====================
    // Validación de nombre (solo letras y espacios)
    $form.find('#nombre-Edit').on('input', function () {
        const valor = $(this).val().trim();
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúñÑ]+)*$/;
        regex.test(valor) ? showValid('nombre-Edit') : showError('nombre-Edit', 'Solo letras y espacios válidos');
    });

    // Validación de apellido (solo letras y espacios)
    $form.find('#apellido-Edit').on('input', function () {
        const valor = $(this).val().trim();
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúñÑ]+)*$/;
        regex.test(valor) ? showValid('apellido-Edit') : showError('apellido-Edit', 'Solo letras y espacios válidos');
    });

    // Validación de nombre de usuario (4-20 caracteres alfanuméricos)
    $form.find('#nombre_usuario-Edit').on('input', function () {
        const username = $(this).val().trim();
        clearTimeout(timeoutUsuario); // Limpiar el timeout previo

        if (!/^[a-zA-Z0-9_]{4,20}$/.test(username)) {
            showError('nombre_usuario-Edit', '4-20 caracteres alfanuméricos');
            return;
        }

        timeoutUsuario = setTimeout(() => {
            if (!currentUserId) return;

            fetch(`../../app/controlador/Usuario/verificarNombreUsuario.php?nombre_usuario=${encodeURIComponent(username)}&id_usuario=${currentUserId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.existe) {
                        showError('nombre_usuario-Edit', 'Usuario ya registrado');
                    } else {
                        showValid('nombre_usuario-Edit');
                    }
                })
                .catch(err => {
                    console.error(err);
                    toastr.error('Error en la verificación del usuario');
                });
        }, 500);
    });

    // Validación de correo (formato de correo)
    $form.find('#correo-Edit').on('input', function () {
        const correo = $(this).val().trim();
        clearTimeout(timeoutCorreo); // Limpiar el timeout previo

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            showError('correo-Edit', 'Formato de correo inválido');
            return;
        }

        timeoutCorreo = setTimeout(() => {
            if (!currentUserId) return;

            fetch(`../../app/controlador/Usuario/verificarCorreo.php?correo=${encodeURIComponent(correo)}&id_usuario=${currentUserId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.existe) {
                        showError('correo-Edit', 'Correo ya registrado');
                    } else {
                        showValid('correo-Edit');
                    }
                })
                .catch(err => {
                    console.error(err);
                    toastr.error('Error en la verificación del correo');
                });
        }, 500);
    });

    // ==================== MANEJO DEL MODAL ====================
    $('#modal-editUsuario')
        .on('show.bs.modal', function () {
            $form.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
            $form.find('.invalid-feedback').hide().text('');
        })
        .on('hidden.bs.modal', function () {
            $form[0].reset();
            currentUserId = null;
            clearTimeout(timeoutUsuario); // Limpiar el timeout
            clearTimeout(timeoutCorreo);  // Limpiar el timeout
        });

    // ==================== CARGA DE DATOS AL EDITAR ====================
    $(document).on('click', '.button.edit', function () {
        currentUserId = $(this).data('id');

        fetch(`../../app/controlador/Usuario/obtenerUsuarioEditar.php?id=${currentUserId}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) throw new Error(data.error);

                $form.find('#nombre-Edit').val(data.nombre);
                $form.find('#apellido-Edit').val(data.apellido);
                $form.find('#nombre_usuario-Edit').val(data.nombre_usuario);
                $form.find('#rol-Edit').val(data.rol);
                $form.find('#correo-Edit').val(data.correo);
                $form.find('#estado_usuario-Edit').val(data.estado_usuario);
                $form.find('#avatarUsuario').attr('src', `../../${data.imagen}?t=${Date.now()}`);
                $form.find('#imagen_actual-Edit').val(data.imagen);
                $form.find('#idUsuario').val(currentUserId);

                $('#modal-editUsuario').modal('show');
            })
            .catch(error => {
                console.error(error);
                toastr.error('Error al cargar datos del usuario');
            });
    });

    // ==================== ENVÍO DEL FORMULARIO ====================
    $form.on('submit', function (e) {
        e.preventDefault();

        $form.find('input, select').trigger('input').trigger('change');

        if ($form.find('.is-invalid').length > 0) {
            toastr.warning("Complete correctamente los campos marcados");
            return;
        }

        const formData = new FormData(this);

        fetch('../../app/controlador/Usuario/editarUsuario.php', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    $('#modal-editUsuario').modal('hide');
                    toastr.success("¡Usuario actualizado correctamente!");
                    cargarTabla();
                } else {
                    throw new Error(data.message || "Error en el servidor");
                }
            })
            .catch(error => {
                console.error(error);
                toastr.error(error.message);
            });
    });
});
