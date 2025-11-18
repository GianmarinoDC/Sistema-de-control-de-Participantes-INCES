$(document).ready(function () {
    // Función para cargar la tabla de participantes
    function cargarTabla() {
        $.ajax({
            url: '../../app/controlador/obtenerParticipantes.php',
            method: 'GET',
            dataType: 'json',
            success: function (data) {

                
                let rows = '';
                if (Array.isArray(data) && data.length > 0) {
                    data.forEach(participante => {
                        const estado = participante.estado === 'En formación' ?
                            '<span class="badge bg-success">En formación</span>' :
                            participante.estado === 'Inactivo' ?
                                '<span class="badge bg-danger">Inactivo</span>' :
                                participante.estado === 'En sistema' ?
                                    '<span class="badge bg-warning text-dark">En sistema</span>' :
                                    participante.estado === 'Asignado' ?
                                        '<span class="badge bg-primary">Asignado</span>' :
                                        participante.estado;
    
                        rows += `
                            <tr>
                                <td>${participante.id_participante}</td>
                                <td>${participante.cedula}</td>
                                <td>${participante.nombre}</td>
                                <td>${participante.apellido}</td>
                                <td>${participante.genero}</td>
                                <td>${participante.edad}</td>
                                <td>${participante.correo}</td>
                                <td>${estado}</td>
                                <td><!-- Botones de acción -->
                                    <button class='button view' title="Ver Participante"  data-id="${participante.id_participante}" data-bs-toggle='modal' data-bs-target='#modal-viewParticipante'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#fff' class='bi bi-binoculars' viewBox='0 0 16 16'>
                                    <path d='M3 2.5A1.5 1.5 0 0 1 4.5 1h1A1.5 1.5 0 0 1 7 2.5V5h2V2.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5v2.382a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V14.5a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 14.5v-3a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5v3A1.5 1.5 0 0 1 5.5 16h-3A1.5 1.5 0 0 1 1 14.5V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882zM4.5 2a.5.5 0 0 0-.5.5V3h2v-.5a.5.5 0 0 0-.5-.5zM6 4H4v.882a1.5 1.5 0 0 1-.83 1.342l-.894.447A.5.5 0 0 0 2 7.118V13h4v-1.293l-.854-.853A.5.5 0 0 1 5 10.5v-1A1.5 1.5 0 0 1 6.5 8h3A1.5 1.5 0 0 1 11 9.5v1a.5.5 0 0 1-.146.354l-.854.853V13h4V7.118a.5.5 0 0 0-.276-.447l-.895-.447A1.5 1.5 0 0 1 12 4.882V4h-2v1.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm4-1h2v-.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm4 11h-4v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zm-8 0H2v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5z'/>
                                    </svg></button>

                                    <a href="#"><button  class='button curso' title="Asignar Curso"  data-id="${participante.id_participante}" data-bs-toggle='modal' data-bs-target='#modal-AsignarCursoParticipante'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#fff' class='bi bi-journal-bookmark-fill' viewBox='0 0 16 16'>
                                    <path fill-rule='evenodd' d='M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z'/>
                                    <path d='M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2'/>
                                    <path d='M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z'/>
                                    </svg></button></a>


                                    <button class='button edit' title="Editar Participante" data-id="${participante.id_participante}" data-bs-toggle='modal' data-bs-target='#modal-editParticipante'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil' viewBox='0 0 16 16'>
                                    <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325'/>
                                    </svg></button>

                                    <button class='button delete' title="Eliminar Participante" data-id="${participante.id_participante}" data-bs-toggle='modal' data-bs-target='#modal-deleteParticipante'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#fff' class='bi bi-trash' viewBox='0 0 16 16'>
                                    <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z'/>
                                    <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z'/>
                                    </svg></button>
                                </td>
                            </tr>
                        `;
                    });
                } else if (data.error) {
                    rows = `<tr><td colspan="8" class="text-center">${data.message}</td></tr>`;
                } else {
                    rows = '<tr><td colspan="8" class="text-center">No hay participantes registrados</td></tr>';
                }
                $('#tabla-participantes tbody').html(rows);

                console.log("Entrando a lógica de ocultar botones según rol");
if (typeof userRole !== 'undefined') {
    console.log("Rol detectado:", userRole);

    if (userRole === 'Apoyo') {
        // Ocultar botón "Agregar Participantes"
        const btnAdd = document.getElementById('btn-addParticipante');
        if (btnAdd) {
            btnAdd.remove();
            console.log("Botón 'Agregar Participantes' eliminado");
        } else {
            console.log("Botón 'Agregar Participantes' no encontrado");
        }

        // Eliminar botones curso, edit y delete
        document.querySelectorAll('button.curso, button.edit, button.delete').forEach(boton => {
            console.log("Eliminando botón:", boton.className);
            boton.remove();
        });

        // Asegurar que solo quede botón 'view'
        document.querySelectorAll('button.view').forEach(boton => {
            const td = boton.closest('td');
            if (td) {
                td.innerHTML = '';
                td.appendChild(boton);
                console.log("Botón 'view' conservado");
            }
        });
    } else {
        console.log("El rol no es 'Apoyo'; no se eliminan botones.");
    }
} else {
    console.error("userRole no está definido. ¿Insertaste el <script> PHP antes del archivo JS?");
}


            },
            error: function (xhr, status, error) {
                console.error('Error en la solicitud AJAX:', error);
                console.error('Respuesta del servidor:', xhr.responseText);
            }
        });
    }

// Cargar la tabla al cargar la página
cargarTabla();

$(document).ready(function() {
    let timeoutCedula;
    const $form = $('#form-participante'); // Referencia al formulario

    function showError(fieldId, message) {
        $form.find(`#${fieldId}`).removeClass('is-valid').addClass('is-invalid');
        $form.find(`#error-${fieldId}`).text(message).show();
    }

    function showValid(fieldId) {
        $form.find(`#${fieldId}`).removeClass('is-invalid').addClass('is-valid');
        $form.find(`#error-${fieldId}`).text('').hide();
    }

    $('#modal-addParticipante').on('hidden.bs.modal', function() {
        clearTimeout(timeoutCedula);
        $form[0].reset();
        $form.find('.is-invalid, .is-valid').removeClass('is-invalid is-valid');
        $form.find('.error-feedback').text('').hide();
    });

    // Validación de Cédula
    $form.find('#cedula').on('input', function() {
        const cedula = $(this).val().trim();
        clearTimeout(timeoutCedula);

        if (!/^\d{7,8}$/.test(cedula)) {
            showError('cedula', 'Cédula inválida (7-8 dígitos)');
            return;
        }
        showValid('cedula');

        timeoutCedula = setTimeout(() => {
            $.ajax({
                url: '../../app/controlador/verificarCedula.php',
                method: 'GET',
                data: { cedula: cedula },
                dataType: 'json',
                success: function(response) {
                    if (response.exists) {
                        showError('cedula', 'Cédula ya registrada');
                    } else {
                        showValid('cedula');
                    }
                }
            });
        });
    });

    // Validación de Género
    $form.find('input[name="id_genero"]').on('change', function() {
        const errorDiv = $form.find('#error-id_genero');
        if ($form.find('input[name="id_genero"]:checked').length > 0) {
            errorDiv.text('').hide();
            $form.find('input[name="id_genero"]').removeClass('is-invalid');
        } else {
            errorDiv.text('Seleccione su género').show();
            $form.find('input[name="id_genero"]').addClass('is-invalid');
        }
    });

    // Resto de validaciones
    $form.find('#nombre, #apellido').on('input', function() {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúñÑ]+)*$/;
        regex.test($(this).val().trim()) ? showValid(this.id) : showError(this.id, 'Solo letras y espacios válidos');
    });

    $form.find('#telefono').on('input', function() {
        const regex = /^(0412|0414|0416|0424|0426|0293)\d{7}$/;
        regex.test($(this).val().trim()) ? showValid(this.id) : showError(this.id, 'Formato válido: 0412 | 0414 | 0416 | 0424 | 0426 | 0293');
    });

    $form.find('#fechaNacimiento').on('change', function() {
        const fecha = new Date($(this).val());
        const hoy = new Date();
        const minEdad = new Date(hoy.getFullYear() - 75, hoy.getMonth(), hoy.getDate());
        const maxEdad = new Date(hoy.getFullYear() - 14, hoy.getMonth(), hoy.getDate());

        if (!$(this).val()) {
            showError(this.id, 'Campo obligatorio');
        } else if (fecha > hoy) {
            showError(this.id, 'Fecha futura no permitida');
        } else if (fecha < minEdad || fecha > maxEdad) {
            showError(this.id, 'Edad debe ser entre 14 y 75 años');
        } else {
            showValid(this.id);
        }
    });

    $form.find('#correo').on('input', function() {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        regex.test($(this).val().trim()) ? showValid(this.id) : showError(this.id, 'Correo electrónico inválido');
    });

    $form.find('#id_gradoInstitucion, #id_curso').on('change', function() {
        $(this).val() ? showValid(this.id) : showError(this.id, 'Seleccione una opción');
    });

    // Manejo del estado
    $form.find('#id_curso').on('change', function() {
        const estadoSelect = $form.find('#id_estado')[0];
        if (this.value === '1') {
            estadoSelect.value = 'En sistema';
        } else if (this.value) {
            estadoSelect.value = 'Asignado';
        } else {
            estadoSelect.value = '';
        }
        showValid('id_estado');
    });

    // Envío del formulario
    $form.on('submit', function(e) {
        e.preventDefault();
        $form.find('input, select').trigger('input').trigger('change');

        let cedulaValida = true;
        const cedula = $form.find('#cedula').val().trim();

        if (/^\d{7,8}$/.test(cedula)) {
            $.ajax({
                url: '../../app/controlador/verificarCedula.php',
                method: 'GET',
                data: { cedula: cedula },
                async: false,
                dataType: 'json',
                success: function(response) {
                    if (response.exists) {
                        showError('cedula', 'Cédula ya registrada');
                        cedulaValida = false;
                    }
                }
            });
        }

        if ($form.find('.is-invalid').length === 0 && cedulaValida) {
            $.ajax({
                url: $form.attr('action'),
                method: 'POST',
                data: $form.serialize(),
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        $('#modal-addParticipante').modal('hide');
                        cargarTabla();
                        toastr.success('¡Participante registrado correctamente!');
                    } else {
                        toastr.error(response.message || 'Error al registrar el participante');
                    }
                },
                error: function(xhr) {
                    toastr.error('Error en la solicitud: ' + xhr.statusText);
                }
            });
        } else {
            toastr.warning('Complete los campos requeridos correctamente');
            console.log('Errores en:', $form.find('.is-invalid').map((i, el) => el.id).get());
        }
    });
});
});



let intervaloActualizacion = null;

// Cargar cursos al abrir el modal
$('#modal-addParticipante').on('shown.bs.modal', function () {
    cargarCursos(); // Carga inicial
    intervaloActualizacion = setInterval(cargarCursos, 30000); // Actualizar cada 30 segundos
});

// Detener actualización al cerrar el modal
$('#modal-addParticipante').on('hidden.bs.modal', function () {
    if (intervaloActualizacion) {
        clearInterval(intervaloActualizacion);
        intervaloActualizacion = null;
    }
});

function cargarCursos() {
    $.ajax({
        url: '../../app/controlador/cursosDisponibles.php',
        method: 'GET',
        dataType: 'json',
        beforeSend: function() {
            $('#id_curso').html('<option value="">Cargando...</option>');
        },
        success: function(response) {
            const select = $('#id_curso').empty();
            
            if (response.success) {
                select.append('<option value="">Seleccione</option>');
                
                // Separar "No asignado" del resto
                const noAsignado = response.data.find(curso => curso.id_curso === 1);
                const otrosCursos = response.data.filter(curso => curso.id_curso !== 1);
                
                // Agregar primero "No asignado" si existe
                if (noAsignado) {
                    select.append(
                        `<option value="${noAsignado.id_curso}">${noAsignado.display}</option>`
                    );
                }
                
                // Agregar resto de cursos en el orden recibido
                otrosCursos.forEach(curso => {
                    select.append(
                        `<option value="${curso.id_curso}">${curso.display}</option>`
                    );
                });
                
            } else {
                select.append(`<option value="" disabled>${response.error}</option>`);
            }
        },
        error: function(xhr) {
            $('#id_curso').html('<option value="" disabled>Error de conexión</option>');
            console.error('Detalles del error:', xhr.responseText);
        }
    });
}
