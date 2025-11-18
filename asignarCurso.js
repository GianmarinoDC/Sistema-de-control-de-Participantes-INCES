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
                                <a href="#"><button class='button view' title="Ver Participante"  data-id="${participante.id_participante}" data-bs-toggle='modal' data-bs-target='#modal-viewParticipante'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#fff' class='bi bi-binoculars' viewBox='0 0 16 16'>
                                <path d='M3 2.5A1.5 1.5 0 0 1 4.5 1h1A1.5 1.5 0 0 1 7 2.5V5h2V2.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5v2.382a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V14.5a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 14.5v-3a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5v3A1.5 1.5 0 0 1 5.5 16h-3A1.5 1.5 0 0 1 1 14.5V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882zM4.5 2a.5.5 0 0 0-.5.5V3h2v-.5a.5.5 0 0 0-.5-.5zM6 4H4v.882a1.5 1.5 0 0 1-.83 1.342l-.894.447A.5.5 0 0 0 2 7.118V13h4v-1.293l-.854-.853A.5.5 0 0 1 5 10.5v-1A1.5 1.5 0 0 1 6.5 8h3A1.5 1.5 0 0 1 11 9.5v1a.5.5 0 0 1-.146.354l-.854.853V13h4V7.118a.5.5 0 0 0-.276-.447l-.895-.447A1.5 1.5 0 0 1 12 4.882V4h-2v1.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm4-1h2v-.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm4 11h-4v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zm-8 0H2v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5z'/>
                                </svg></button></a>

                                <a href="#"><button class='button curso' title="Asignar Curso" data-id="${participante.id_participante}" data-bs-toggle='modal' data-bs-target='#modal-AsignarCursoParticipante'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#fff' class='bi bi-journal-bookmark-fill' viewBox='0 0 16 16'>
                                    <path fill-rule='evenodd' d='M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z'/>
                                    <path d='M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2'/>
                                    <path d='M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z'/>
                                    </svg></button></a>


                                <a href="#"><button class='button edit' title="Editar Participante"  data-id="${participante.id_participante}" data-bs-toggle='modal' data-bs-target='#modal-editParticipante'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil' viewBox='0 0 16 16'>
                                <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325'/>
                                </svg></button></a>

                                <a href="#"><button class='button delete' title="Eliminar Participante" data-id="${participante.id_participante}" data-bs-toggle='modal' data-bs-target='#modal-deleteParticipante'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#fff' class='bi bi-trash' viewBox='0 0 16 16'>
                                <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z'/>
                                <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z'/>
                                </svg></button></a>
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
if (typeof userRole !== 'undefined') {
    

    if (userRole === 'Apoyo') {
        // Ocultar botón "Agregar Participantes"
        const btnAdd = document.getElementById('btn-addParticipante');
        if (btnAdd) {
            btnAdd.remove();

        } else {
        }

        // Eliminar botones curso, edit y delete
        document.querySelectorAll('button.curso, button.edit, button.delete').forEach(boton => {
            boton.remove();
        });

        // Asegurar que solo quede botón 'view'
        document.querySelectorAll('button.view').forEach(boton => {
            const td = boton.closest('td');
            if (td) {
                td.innerHTML = '';
                td.appendChild(boton);

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



function cargarCursosPendientes(idParticipante) {
    $.ajax({
        url: '../../app/controlador/ParticipanteCurso/obtenerCursosParticipante.php',
        method: 'GET',
        data: { id_participante: idParticipante },
        dataType: 'json',
        success: function(data) {
            let container = $('#cursos-pendientes');
            container.empty();

            if (data && data.length > 0) {
                let cursosHTML = '<div class="row g-3">';

                data.forEach(curso => {
                    const badgeType = curso.estatus_participante === 'En formación' 
                        ? '<span class="badge bg-success" title="En formación"><i class="bi bi-arrow-repeat"></i> En formación</span>' 
                        : '<span class="badge bg-warning text-dark" title="Pendiente"><i class="bi bi-clock-history"></i> Pendiente</span>';

                    const botonDesinscribir = curso.estatus_participante === 'Pendiente' 
                        ? `<button class="btn btn-sm btn-danger desinscribir-curso"  data-id="${curso.id_participante_curso}">
                                Desinscribir Curso
                           </button>` 
                        : '';

                    cursosHTML += `
                        <div class="col-12 col-md-6 col-lg-4">
                            <div class="card asignar-card shadow-lg border-light bg-white">
                                <div class="card-body d-flex flex-column justify-content-between h-100">
                                    <div class="mb-2">
                                        <h6 class="fw-semibold mb-1 text-truncate" title="${curso.nombre_curso}" style="color: #020d19;">
                                            <i class="bi bi-book me-1"></i>${curso.nombre_curso}
                                        </h6>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center mt-auto">
                                        ${badgeType}
                                        ${botonDesinscribir}
                                    </div>
                                </div>
                            </div>
                        </div>`;
                });

                cursosHTML += '</div>';
                container.html(cursosHTML);
            } else {
                container.html(`
                    <div class="text-center py-5 bg-light rounded-3">
                        <i class="bi bi-journal-x display-6 text-muted"></i>
                        <h6 class="text-muted mt-3 mb-0">No hay cursos asignados</h6>
                        <small class="text-muted">Comienza asignando un nuevo curso</small>
                    </div>
                `);
            }
        },
        error: function() {
            $('#cursos-pendientes').html(`
                <div class="alert alert-danger" role="alert">
                    <i class="bi bi-exclamation-triangle-fill"></i> Error al cargar los cursos
                </div>
            `);
        }
    });
}


function cargarCursosNoInscritos(idParticipante) {
    $.ajax({
        url: '../../app/controlador/ParticipanteCurso/obtenerCursosNoInscritos.php',
        method: 'GET',
        data: { id_participante: idParticipante },
        dataType: 'json',
        success: function(data) {
            let selectCurso = $('#asignarCurso');
            selectCurso.empty().append('<option value="" disabled selected>Seleccione un curso</option>');

            if (data && data.length > 0) {
                data.forEach(curso => {
                    selectCurso.append(
                        `<option value="${curso.id_curso}">${curso.display}</option>`
                    );
                });
            } else {
                selectCurso.append('<option value="" disabled>No hay cursos disponibles</option>');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error:', xhr.responseText);
            alert('Error al cargar cursos. Ver consola para detalles.');
        }
    });
}



$(document).on('click', '.curso', function() {
    let id_participante = $(this).attr("data-id");

    $.ajax({
        url: '../../app/controlador/ParticipanteCurso/obtenerDatos.php',
        method: 'GET',
        data: { id_participante: id_participante },
        dataType: 'json',
        success: function(data) {
            if (data.error) {
                alert(data.error);
            } else {
                $('#asignar-nombre').text(data.nombre);
                $('#asignar-apellido').text(data.apellido);
                $('#asignar-cedula').text(data.cedula);
                $('#asignar-edad').text(data.edad);
                cargarCursosPendientes(id_participante);
                cargarCursosNoInscritos(id_participante); // Cargar los cursos no inscritos
            }
        },
        error: function() {
            alert('Error al cargar los datos del participante.');
        }
    });
});


// 1. Capturar el click en botones con clase .curso y obtener el ID
$(document).on('click', '.curso', function() {
    let id_participante = $(this).attr("data-id");
    
    // 2. Asignar el ID al campo oculto del formulario
    $('#id_participante').val(id_participante);
    
    // 3. Mostrar el modal (si es necesario)
    $('#modal-AsignarCursoParticipante').modal('show');
});

// 4. Manejar el envío del formulario
$('#formAsignarCurso').submit(function(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    let formData = {
        id_participante: $('#id_participante').val(),
        curso: $('#asignarCurso').val()
    };

    // Validación básica
    if (!formData.curso) {
        toastr.error('Seleccione un curso válido');
        return;
    }

    // 5. Enviar por AJAX
    $.ajax({
        type: "POST",
        url: "../../app/controlador/ParticipanteCurso/asignarCurso.php",
        data: formData,
        dataType: "json",
        success: function(response) {
            if (response.success) {
                toastr.success('Curso asignado correctamente');
                cargarTabla();
                $('#formAsignarCurso')[0].reset(); // Limpiar el formulario
                // Actualizamos la lista de cursos pendientes sin cerrar el modal
                cargarCursosPendientes(formData.id_participante);
                cargarCursosNoInscritos(formData.id_participante);

            } else {

            }
        },
        error: function(xhr, status, error) {
            toastr.error('Error de conexión: ' + error);
        }
    });
});


$(document).on('click', '.desinscribir-curso', function() {
    // Obtener el ID del curso a eliminar
    const idParticipanteCurso = $(this).data('id');
    const idParticipante = $('#id_participante').val();

    // Cerrar el modal activo (por ejemplo, #modal-AsignarCursoParticipante)
    $('#modal-AsignarCursoParticipante').modal('hide');

    // Mostrar el modal de confirmación
    $('#modal-deleteCurso').modal('show');

    // Manejar el clic en el botón "Confirmar" dentro del modal
    $('#confirm-delete-curso').off('click').on('click', function() {
        // Realizar la solicitud para eliminar el curso
        $.ajax({
            url: '../../app/controlador/ParticipanteCurso/eliminarCurso.php',
            method: 'POST',
            data: { 
                id_participante_curso: idParticipanteCurso,
                id_participante: idParticipante 
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    // Mostrar una alerta de éxito
                    toastr.success('El participante se desinscribió del curso correctamente.');

                    // Actualizar los cursos pendientes, no inscritos, y la tabla
                    cargarCursosPendientes(idParticipante);
                    cargarCursosNoInscritos(idParticipante);
                    cargarTabla();
                } else {
                    // Mostrar una alerta en caso de error en la respuesta
                    toastr.error('No se pudo desinscribir al participante. Intente nuevamente.');
                }
                // Cerrar el modal de confirmación
                $('#modal-deleteCurso').modal('hide');

                // Volver a mostrar el modal anterior
                $('#modal-AsignarCursoParticipante').modal('show');
            },
            error: function(xhr, status, error) {
                // Registrar el error en la consola para depuración
                console.error('Error al eliminar el curso:', error);

                // Mostrar una alerta de error
                toastr.error('Error de conexión al intentar desinscribir al participante.');

                // Cerrar el modal de confirmación y volver al modal anterior
                $('#modal-deleteCurso').modal('hide');
                $('#modal-AsignarCursoParticipante').modal('show');
            }
        });
    });

    // Manejar el clic en el botón "Cancelar" dentro del modal
    $('.cancel-modal').off('click').on('click', function() {
        // Cerrar el modal de confirmación
        $('#modal-deleteCurso').modal('hide');

        // Volver al modal anterior
        $('#modal-AsignarCursoParticipante').modal('show');
    });
});

