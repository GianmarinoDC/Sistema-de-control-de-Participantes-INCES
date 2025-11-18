    // Función para cargar la tabla de cursos
    function cargarTablaCursos() {
        $.ajax({
            url: '../../app/controlador/Curso/obtenerCursos.php', 
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                let rows = '';
    
                if (data.success === false) {
                    // Error desde el servidor
                    rows = `<tr><td colspan="10" class="text-center">Error: ${data.message}</td></tr>`;
                } else if (Array.isArray(data)) {
                    // Filtrar cursos y excluir el curso con id_curso = 1
                    data = data.filter(curso => curso.id_curso !== 1);
    
                    if (data.length > 0) {
                        // Ordenar los cursos de menor a mayor por id_curso
                        data.sort((a, b) => a.id_curso - b.id_curso);
    
                        // Generar las filas de la tabla
                        data.forEach(curso => {
                            const cuposDisponibles = curso.max_participantes - curso.num_inscritos;  
                            const estadoCurso = curso.estatus === 'En espera'
                            ? '<span class="badge bg-secondary">En espera</span>'
                            : curso.estatus === 'En proceso'
                                ? '<span class="badge bg-success">En proceso</span>'
                                : curso.estatus === 'Culminado'
                                    ? '<span class="badge bg-danger">Culminado</span>'
                                    : curso.estatus === 'Aprobado'
                                    ? '<span class="badge bg-primary">Aprobado</span>'
                                    : '<span class="badge bg-dark">Desconocido</span>';
    
                            rows += `
                                <tr>
                                    <td>${curso.id_curso}</td>
                                    <td>${curso.nombre_curso}</td>
                                    <td>${curso.nombre_modalidad}</td>
                                    <td>${curso.num_inscritos}</td>
                                    <td>${cuposDisponibles}</td>
                                    <td>${curso.turno}</td>
                                    <td>${curso.fecha_inicio}</td>
                                    <td>${curso.fecha_fin}</td>
                                    <td>${estadoCurso}</td>
                                    <td>
                                       <!-- Botones de acción -->
                                        <a href="#"><button class='button view' title="Ver Curso" data-id="${curso.id_curso}" data-bs-toggle='modal' data-bs-target='#modal-viewCurso'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#fff' class='bi bi-binoculars' viewBox='0 0 16 16'>
                                        <path d='M3 2.5A1.5 1.5 0 0 1 4.5 1h1A1.5 1.5 0 0 1 7 2.5V5h2V2.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5v2.382a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V14.5a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 14.5v-3a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5v3A1.5 1.5 0 0 1 5.5 16h-3A1.5 1.5 0 0 1 1 14.5V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882zM4.5 2a.5.5 0 0 0-.5.5V3h2v-.5a.5.5 0 0 0-.5-.5zM6 4H4v.882a1.5 1.5 0 0 1-.83 1.342l-.894.447A.5.5 0 0 0 2 7.118V13h4v-1.293l-.854-.853A.5.5 0 0 1 5 10.5v-1A1.5 1.5 0 0 1 6.5 8h3A1.5 1.5 0 0 1 11 9.5v1a.5.5 0 0 1-.146.354l-.854.853V13h4V7.118a.5.5 0 0 0-.276-.447l-.895-.447A1.5 1.5 0 0 1 12 4.882V4h-2v1.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm4-1h2v-.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm4 11h-4v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zm-8 0H2v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5z'/>
                                        </svg></button></a>
  
                                        <a href="#"><button class='button participante' title="Asignar Participantes" data-id="${curso.id_curso}" data-bs-toggle='modal' data-bs-target='#modal-participanteCurso'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" class="bi bi-person-add" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                                        <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
                                        </svg></button></a>

                                        <a href="#"><button class='button config' title="Calificación" data-id="${curso.id_curso}" data-bs-toggle='modal' data-bs-target='#cursoModal'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
</svg></button></a>
    
                                        <a href="#"><button class='button edit' title="Editar Curso" data-id="${curso.id_curso}" data-bs-toggle='modal' data-bs-target='#modal-editCurso'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil' viewBox='0 0 16 16'>
                                        <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325'/>
                                        </svg></button></a>
    
                                        <a href="#"><button class='button delete' title="Eliminar Curso" data-id="${curso.id_curso}" data-bs-toggle='modal' data-bs-target='#modal-deleteCurso'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#fff' class='bi bi-trash' viewBox='0 0 16 16'>
                                        <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z'/>
                                        <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z'/>
                                        </svg></button></a>
                                    </td>
                                </tr>
                            `;
                        });
                    } else {
                        // Si no hay cursos después del filtrado
                        rows = '<tr><td colspan="10" class="text-center">No hay Cursos registrados</td></tr>';
                    }
                } else {
                    // Caso por defecto si la respuesta no tiene un formato esperado
                    rows = '<tr><td colspan="10" class="text-center">No hay Cursos registrados</td></tr>';
                }
    
                $('#tabla-cursos tbody').html(rows);
                if (typeof userRole !== 'undefined' && userRole === 'Apoyo') {
                    // Eliminar todos los botones excepto el de clase 'view'
                    document.querySelectorAll('#tabla-cursos tbody tr').forEach(row => {
                        const viewButton = row.querySelector('button.view');
                        const cell = viewButton?.closest('td');
                
                        if (cell && viewButton) {
                            // Limpiar la celda y volver a insertar solo el botón 'view'
                            cell.innerHTML = '';
                            cell.appendChild(viewButton);
                        }
                    });
                
                    // Eliminar también el botón superior de "Agregar Participante"
                    const btnAdd = document.getElementById('btn-add');
                    if (btnAdd) {
                        btnAdd.remove();
                    }
                }
            },
            error: function (xhr, status, error) {
                // Error en la llamada AJAX
                $('#tabla-cursos tbody').html('<tr><td colspan="10" class="text-center">Error al cargar los datos</td></tr>');
            }
        });
    }

let cursoActual = null;
let timeoutBusqueda = null;

// Evento para mostrar el modal
$('#modal-participanteCurso').on('show.bs.modal', function(e) {
    cursoActual = $(e.relatedTarget).data('id');
    cargarSecciones();
    actualizarCabecera();
});

// Función principal de carga
function cargarSecciones() {
    cargarAgregarParticipantes('');
    cargarParticipantesInscritos();
}

function cargarAgregarParticipantes(busqueda) {
    const $seccion = $('#seccion-agregar');
    
    // Mostrar loader mientras carga
    $seccion.html(`
        <div class="text-center py-4">
            <div class="spinner-border text-secondary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
        </div>
    `);

    // Verificar estado del curso
    $.ajax({
        url: '../../app/controlador/Curso/obtenerInfoCurso.php',
        method: 'GET',
        dataType: 'json',
        data: { id_curso: cursoActual },
        success: function(cursoInfo) {
            // Validación de estado del curso
            if ([2, 3].includes(cursoInfo.id_estatusCurso)) {
                $seccion.html(`
                    <div class="text-center py-5 bg-light rounded-3">
                        <i class="bi bi-journal-x display-6 text-muted"></i>
                        <h6 class="text-muted mt-3 mb-0">Curso ${cursoInfo.id_estatusCurso === 2 ? 'en proceso' : 'Culminado'}</h6>
                        <small class="text-muted">No se pueden agregar participantes</small>
                    </div>
                `);
                return;
            }

            // Nueva validación para el curso aprobado (id_estatusCurso 4)
            if (cursoInfo.id_estatusCurso === 4) {
                $seccion.html(`
                    <div class="text-center py-5 bg-light rounded-3">
                        <i class="bi bi-journal-check display-6 text-success"></i>
                        <h6 class="text-success mt-3 mb-0">Curso Aprobado</h6>
                        <small class="text-muted">No se pueden realizar modificaciones en este curso.</small>
                    </div>
                `);
                return;
            }

            // Verificar cupos
            if (cursoInfo.num_inscritos >= cursoInfo.max_participantes) {
                $seccion.html(`
                    <div class="text-center py-5 bg-light rounded-3 shadow-sm">
                        <i class="bi bi-exclamation-octagon-fill display-4 text-warning mb-3"></i>
                        <h5 class="text-warning mb-2">CUPOS COMPLETOS</h5>
                        <p class="text-muted small mb-0">Se ha alcanzado el límite máximo de participantes</p>
                        <p class="text-muted small">(${cursoInfo.num_inscritos}/${cursoInfo.max_participantes})</p>
                    </div>
                `);
                return;
            }

            // Cargar participantes disponibles
            $.ajax({
                url: '../../app/controlador/Curso/obtenerDisponibles.php',
                method: 'GET',
                dataType: 'json',
                data: { 
                    id_curso: cursoActual,
                    busqueda: busqueda 
                },
                success: function(response) {
                    $seccion.empty();

                    if(response.cupos_llenos) {
                        $seccion.html(`
                            <div class="text-center py-5">
                                <i class="bi bi-slash-circle-fill display-4 text-danger mb-3"></i>
                                <h5 class="text-danger mb-2">CUPOS LLENOS</h5>
                                <p class="text-muted small">No se pueden agregar más participantes</p>
                            </div>
                        `);
                        return;
                    }

                    if(response && Array.isArray(response) && response.length > 0) {
                        response.forEach(p => {
                            $seccion.append(`
                                <div class="list-item animate__animated animate__fadeIn">
                                    <div class="participante-info">
                                        <span class="cedula">${p.cedula}</span>
                                        <span class="nombre">${p.nombre} ${p.apellido}</span>
                                    </div>
                                    <button class="btn btn-agregar" 
                                            onclick="agregarParticipante(${p.id_participante})">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#198754" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                                        </svg>
                                    </button>
                                </div>
                            `);
                        });
                    } else {
                        $seccion.html(`
                            <div class="text-center py-4">
                                <i class="bi bi-people display-4 text-muted mb-3"></i>
                                <p class="text-muted mb-0">No se encontraron participantes</p>
                                ${busqueda ? `<small class="text-muted">Búsqueda: "${busqueda}"</small>` : ''}
                            </div>
                        `);
                    }
                },
                error: function(xhr) {
                    $seccion.html(`
                        <div class="text-center py-4 text-danger">
                            <i class="bi bi-x-circle-fill display-4"></i>
                            <p>Error al cargar participantes</p>
                            <small>${xhr.statusText}</small>
                        </div>
                    `);
                }
            });
        },
        error: function() {
            $seccion.html(`
                <div class="text-center py-4 text-danger">
                    <i class="bi bi-exclamation-triangle-fill display-4"></i>
                    <p>Error al verificar el curso</p>
                </div>
            `);
        }
    });
}

function cargarParticipantesInscritos() {
    const $seccion = $('#seccion-inscritos');
    
    // Verificar estado del curso primero
    $.ajax({
        url: '../../app/controlador/Curso/obtenerInfoCurso.php',
        method: 'GET',
        dataType: 'json',
        data: { id_curso: cursoActual },
        success: function(cursoInfo) {
            // Validación de estado del curso
            if ([2, 3].includes(cursoInfo.id_estatusCurso)) {
                $seccion.html(`
                    <div class="text-center py-5 bg-light rounded-3">
                        <i class="bi bi-journal-x display-6 text-muted"></i>
                        <h6 class="text-muted mt-3 mb-0">Curso ${cursoInfo.id_estatusCurso === 2 ? 'en proceso' : 'Culminado'}</h6>
                        <small class="text-muted">No se pueden modificar participantes</small>
                    </div>
                `);
                return;
            }

            // Nueva validación para el curso aprobado (id_estatusCurso 4)
            if (cursoInfo.id_estatusCurso === 4) {
                $seccion.html(`
                    <div class="text-center py-5 bg-light rounded-3">
                        <i class="bi bi-journal-check display-6 text-success"></i>
                        <h6 class="text-success mt-3 mb-0">Curso Aprobado</h6>
                        <small class="text-muted">No se pueden realizar modificaciones en este curso.</small>
                    </div>
                `);
                return;
            }

            // Cargar participantes inscritos
            $.ajax({
                url: '../../app/controlador/Curso/obtenerInscritos.php',
                method: 'GET',
                dataType: 'json',
                data: { id_curso: cursoActual },
                success: function(response) {
                    $seccion.empty();
                    
                    if(response && response.length > 0) {
                        response.forEach(p => {
                            $seccion.append(`
                                <div class="list-item">
                                    <div class="participante-info">
                                        <span class="cedula">${p.cedula}</span>
                                        <span class="nombre">${p.nombre} ${p.apellido}</span>
                                    </div>
                                    <button class="btn" 
                                            onclick="eliminarParticipante(${p.id_participante_curso})">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#dc3545" class="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z"/>
                                        </svg>
                                    </button>
                                </div>
                            `);
                        });
                    } else {
                        $seccion.append('<div class="text-muted text-center">No hay participantes inscritos</div>');
                    }
                },
                error: function() {
                    $('#seccion-inscritos').html('<div class="text-danger text-center">Error cargando inscritos</div>');
                }
            });
        },
        error: function() {
            $seccion.html('<div class="text-danger text-center">Error verificando estado del curso</div>');
        }
    });
}

// Búsqueda en tiempo real
$('#busqueda-participantes').on('input', function() {
    clearTimeout(timeoutBusqueda);
    timeoutBusqueda = setTimeout(() => {
        cargarAgregarParticipantes($(this).val().trim());
    });
});

// Actualizar información de cabecera
function actualizarCabecera() {
    $.ajax({
        url: '../../app/controlador/Curso/obtenerInfoCurso.php',
        method: 'GET',
        dataType: 'json',
        data: { id_curso: cursoActual },
        success: function(data) {
            if(data) {
                $('#cupos-actuales').text(`${data.num_inscritos}/${data.max_participantes}`);
                const estado = data.id_estatusCurso == 1 ? 'En espera' : 
                             data.id_estatusCurso == 2 ? 'En proceso' : 
                             data.id_estatusCurso == 4 ? 'Aprobado' : 'Culminado';
                const color = data.id_estatusCurso == 1 ? 'secondary' : 
                            data.id_estatusCurso == 2 ? 'warning' : 
                            data.id_estatusCurso == 4 ? 'success' : 'success';
                $('#estado-curso').removeClass().addClass(`badge bg-${color}`).text(estado);
                
                if(data.id_estatusCurso != 1 && data.id_estatusCurso != 4) {
                    $('.btn-action').prop('disabled', true).addClass('opacity-50');
                }
            }
        }
    });
}

function agregarParticipante(id) {
    const payload = {
        id_curso: cursoActual,
        id_participante: id
    };

    $.ajax({
        url: '../../app/controlador/Curso/agregarParticipante.php',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(payload),
        success: function(response) {
            if(response.success) {
                cargarAgregarParticipantes($('#busqueda-participantes').val().trim());
                cargarParticipantesInscritos();
                actualizarCabecera();
                cargarTablaCursos();
                toastr.success('Participante agregado correctamente');
            } else {
                toastr.error(response.error || 'Error en la operación');
            }
        },
        error: function(xhr) {
            const errorMsg = xhr.responseJSON?.error || 'Error de conexión';
            toastr.error(errorMsg);
            console.error("Detalles del error:", xhr.responseText);
        }
    });
}

function eliminarParticipante(id) {
    $.ajax({
        url: '../../app/controlador/Curso/eliminarParticipante.php',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ id_participante_curso: id }),
        success: function(response) {
            if (response.success) {
                cargarAgregarParticipantes($('#busqueda-participantes').val().trim());
                cargarParticipantesInscritos();
                actualizarCabecera();
                cargarTablaCursos();
                toastr.success(response.message || 'Participante eliminado correctamente');
            } else {
                toastr.error(response.error || 'Error al eliminar participante');
            }
        },
        error: function(xhr) {
            let errorMessage = 'Error en la conexión';
            try {
                const response = JSON.parse(xhr.responseText);
                errorMessage = response.error || errorMessage;
            } catch(e) {}
            
            toastr.error(errorMessage);
            console.error("Detalles del error:", xhr.responseText);
        }
    });
}
