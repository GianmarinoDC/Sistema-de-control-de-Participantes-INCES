// Función para cargar la tabla de participantes
function cargarTabla() {

    $.ajax({
        url: '../../app/controlador/Docente/obtenerDocentes.php', 
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            
            let rows = '';
            if (Array.isArray(data) && data.length > 0) {
                data.forEach(participante => {
                    const estado = participante.estado === "En formación"
    ? '<span class="badge bg-success">En formación</span>'
    : participante.estado === "Disponible"
        ? '<span class="badge bg-warning text-black">Disponible</span>'
        : participante.estado === "Asignado"
            ? '<span class="badge bg-primary">Asignado</span>'
            : participante.estado;


                    rows += `
                        <tr>
                            <td>${participante.id_docente}</td>
                            <td>${participante.cedula}</td>
                            <td>${participante.nombre}</td>
                            <td>${participante.apellido}</td>
                            <td>${participante.genero}</td>
                            <td>${participante.edad}</td>
                            <td>${participante.correo}</td>
                            <td>${estado}</td>
                            <td>
                                <!-- Botones de acción -->
                                <a href="#"><button class='button view' title="Ver Docente" data-id="${participante.id_docente}" data-bs-toggle='modal' data-bs-target='#modal-viewDocente'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#fff' class='bi bi-binoculars' viewBox='0 0 16 16'>
                                <path d='M3 2.5A1.5 1.5 0 0 1 4.5 1h1A1.5 1.5 0 0 1 7 2.5V5h2V2.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5v2.382a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V14.5a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 14.5v-3a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5v3A1.5 1.5 0 0 1 5.5 16h-3A1.5 1.5 0 0 1 1 14.5V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882zM4.5 2a.5.5 0 0 0-.5.5V3h2v-.5a.5.5 0 0 0-.5-.5zM6 4H4v.882a1.5 1.5 0 0 1-.83 1.342l-.894.447A.5.5 0 0 0 2 7.118V13h4v-1.293l-.854-.853A.5.5 0 0 1 5 10.5v-1A1.5 1.5 0 0 1 6.5 8h3A1.5 1.5 0 0 1 11 9.5v1a.5.5 0 0 1-.146.354l-.854.853V13h4V7.118a.5.5 0 0 0-.276-.447l-.895-.447A1.5 1.5 0 0 1 12 4.882V4h-2v1.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm4-1h2v-.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm4 11h-4v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zm-8 0H2v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5z'/>
                                </svg></button></a>

                                <a href="#"><button class='button curso' title="Asignar Curso"  data-id="${participante.id_docente}" data-bs-toggle='modal' data-bs-target='#modal-AsignarCursoDocente'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#fff' class='bi bi-journal-bookmark-fill' viewBox='0 0 16 16'>
                                <path fill-rule='evenodd' d='M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z'/>
                                <path d='M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2'/>
                                <path d='M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z'/>
                                </svg></button></a>

                                <a href="#"><button class='button edit' title="Editar Docente"  data-id="${participante.id_docente}" data-bs-toggle='modal' data-bs-target='#modal-editDocente'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil' viewBox='0 0 16 16'>
                                <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325'/>
                                </svg></button></a>

                                <a href="#"><button class='button delete' title="Eliminar Docente" data-id="${participante.id_docente}" data-bs-toggle='modal' data-bs-target='#modal-deleteDocente'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#fff' class='bi bi-trash' viewBox='0 0 16 16'>
                                <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z'/>
                                <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z'/>
                                </svg></button></a>
                            </td>
                        </tr>
                    `;
                });
            } else if (data.error) {
                console.error("Error en el servidor:", data.message); 
                rows = `<tr><td colspan="10" class="text-center">Error: ${data.message}</td></tr>`;
            } else {
                rows = '<tr><td colspan="10" class="text-center">No hay Docentes registrados</td></tr>';
            }
            $('#tabla-docentes tbody').html(rows);
            if (typeof userRole !== 'undefined' && userRole === 'Apoyo') {
                // Eliminar todos los botones excepto el de clase 'view'
                document.querySelectorAll('#tabla-docentes tbody tr').forEach(row => {
                    const viewButton = row.querySelector('button.view');
                    const cell = viewButton?.closest('td');
            
                    if (cell && viewButton) {
                        // Limpiar la celda y volver a insertar solo el botón 'view'
                        cell.innerHTML = '';
                        cell.appendChild(viewButton);
                    }
                });
            
                // Eliminar también el botón superior de "Agregar Participante"
                const btnAdd = document.getElementById('btn-addDocente');
                if (btnAdd) {
                    btnAdd.remove();
                }
            }
        },
        error: function (xhr, status, error) {
            console.error('Error en la solicitud AJAX:', error); 
            console.error('Respuesta del servidor:', xhr.responseText); 
        }
    });
}

let docenteSeleccionado = null;

// Al hacer clic en el botón para asignar curso
$(document).on('click', '.curso', function () {
    docenteSeleccionado = $(this).data('id');
    $('#id_docente').val(docenteSeleccionado);

    // Cargar datos del docente
    $.ajax({
        url: '../../app/controlador/DocenteCurso/obtenerDocente.php',
        type: 'GET',
        data: { id_docente: docenteSeleccionado },
        dataType: 'json',
        success: function (docente) {
            $('#asignar-nombre-docente').text(docente.nombre);
            $('#asignar-apellido-docente').text(docente.apellido);
            $('#asignar-cedula-docente').text(docente.cedula);
            $('#asignar-correo-docente').text(docente.correo);
        }
    });

    // Cargar cursos asignados y no asignados
    cargarCursosDocente(docenteSeleccionado);
});

// Función principal para cargar cursos
function cargarCursosDocente(idDocente) {
    // Cursos asignados
    $.ajax({
        url: '../../app/controlador/DocenteCurso/obtenerCursosDocente.php',
        type: 'GET',
        data: { id_docente: idDocente },
        dataType: 'json',
        success: function (data) {
            const container = $('#cursos-asignados');
            container.empty();

            if (data.length > 0) {
                let html = '<ul class="list-group">';
                data.forEach(curso => {
                    html += `
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            ${curso.nombre_curso}
                            <button class="btn btn-danger btn-sm desinscribir-docente"
                                    data-id="${curso.id_docente_curso}"
                                    data-docente="${idDocente}">
                                Desinscribir
                            </button>
                        </li>`;
                });
                html += '</ul>';
                container.html(html);
            } else {
                container.html('<div class="alert alert-info">Este docente no tiene cursos asignados.</div>');
            }
        },
        error: function () {
            $('#cursos-asignados').html('<div class="alert alert-danger">Error al cargar cursos asignados.</div>');
        }
    });

    // Cursos no asignados
    $.ajax({
        url: '../../app/controlador/DocenteCurso/obtenerCursosNoInscritos.php',
        type: 'GET',
        data: { id_docente: idDocente },
        dataType: 'json',
        success: function (data) {
            const select = $('#asignarCursoDocente');
            select.empty().append('<option disabled selected>Seleccione un curso</option>');

            if (data.length > 0) {
                data.forEach(curso => {
                    select.append(`<option value="${curso.id_curso}">${curso.display}</option>`);
                });
            } else {
                select.append('<option disabled>No hay cursos disponibles</option>');
            }
        }
    });
}

// Guardar asignación de curso
$('#formAsignarCursoDocente').submit(function (e) {
    e.preventDefault();
    const idDocente = docenteSeleccionado;
    const idCurso = $('#asignarCursoDocente').val();

    if (!idCurso) {
        toastr.warning('Seleccione un curso válido');
        return;
    }

    $.ajax({
        url: '../../app/controlador/DocenteCurso/asignarCurso.php',
        type: 'POST',
        data: {
            id_docente: idDocente,
            curso: idCurso
        },
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                toastr.success('Curso asignado correctamente');
                cargarCursosDocente(idDocente);
                cargarTabla(); // Recargar tabla principal si es necesario
            } else {
                toastr.error('No se pudo asignar el curso');
            }
        },
        error: function () {
            toastr.error('Error en la solicitud al asignar curso');
        }
    });
});

// Desinscribir docente de curso
$(document).on('click', '.desinscribir-docente', function () {
    const idDocenteCurso = $(this).data('id');  // ID del docente en el curso
    const idDocente = $(this).data('docente');  // ID del docente

    // Cerrar el modal activo (si hay uno abierto)
    $('#modal-AsignarCursoDocente').modal('hide');  // Ajusta el id del modal si es necesario

    // Mostrar el modal de confirmación para desinscribir docente
    $('#modal-desinscribirDocente').modal('show');

    // Manejar el clic en el botón "Desinscribir" dentro del modal
    $('#confirm-delete-docente').off('click').on('click', function () {
        // Realizar la solicitud AJAX para desinscribir al docente
        $.ajax({
            url: '../../app/controlador/DocenteCurso/eliminarCurso.php',
            type: 'POST',
            data: { id_docente_curso: idDocenteCurso },
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    toastr.success('Docente desinscrito correctamente del curso');
                    cargarTabla();  // Refresca la tabla después de la desinscripción
                    cargarCursosDocente(idDocente);  // Actualiza la lista de cursos del docente
                } else {
                    toastr.error(response.error || 'Error al desinscribir el docente');
                }
                // Cerrar el modal de confirmación
                $('#modal-desinscribirDocente').modal('hide');

                // Volver a mostrar el modal anterior si es necesario
                $('#modal-AsignarCursoDocente').modal('show');
            },
            error: function () {
                toastr.error('Ocurrió un error al desinscribir');
                $('#modal-desinscribirDocente').modal('hide');
                $('#modal-AsignarCursoDocente').modal('show');
            }
        });
    });

    // Manejar el clic en el botón "Cancelar" dentro del modal
    $('.cancel-modal').off('click').on('click', function () {
        // Cerrar el modal de confirmación
        $('#modal-desinscribirDocente').modal('hide');

        // Volver al modal anterior
        $('#modal-AsignarCursoDocente').modal('show');
    });
});


// Verificar estado del docente y actualizar si es necesario
function verificarYActualizarEstado(idDocente) {
    $.ajax({
        url: '../../app/controlador/DocenteCurso/obtenerEstado.php',
        type: 'GET',
        data: { id_docente: idDocente },
        dataType: 'json',
        success: function (data) {
            if (data.estado !== 'En formación') {
                actualizarEstadoDocente(idDocente, 'Asignado');
            }
        }
    });
}

// Actualizar estado del docente
function actualizarEstadoDocente(idDocente, nuevoEstado) {
    $.ajax({
        url: '../../app/controlador/DocenteCurso/actualizarEstado.php',
        type: 'POST',
        data: { id_docente: idDocente, estado: nuevoEstado },
        dataType: 'json'
    });
}
