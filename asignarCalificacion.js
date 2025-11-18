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
                
                    // Eliminar también el botón superior de "Agregar Curso"
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


    $(document).ready(function () {
        // Abre el modal y carga los participantes del curso
        $(document).on('click', '.button.config', function () {
            const idCurso = $(this).data('id');
            $('#btnFinalizar').data('id', idCurso);
            $('#btnGuardar').data('id', idCurso);
            $('#btnReiniciarCurso').data('id', idCurso);
    
            fetch(`../../app/controlador/Curso/obtenerParticipantes.php?id_curso=${idCurso}`)
                .then(response => response.json())
                .then(data => {
                    const participantes = data.participantes;
                    const cursoCulminado = data.id_estatus === 3;
                    const cursoEnEspera = data.id_estatus === 1;
                    const cursoReiniciado = data.id_estatus === 4;
    
                    const lista = $('#listaParticipantes');
                    lista.empty();
    
                    // Control de botones
                    $('#btnGuardar').prop('disabled', !cursoCulminado || cursoEnEspera || cursoReiniciado);
                    $('#btnFinalizar').prop('disabled', cursoCulminado || cursoEnEspera || cursoReiniciado);
                    $('#btnReiniciarCurso').prop('disabled', !cursoReiniciado);
    
                    const alerta = $('#cursoFinalizadoAlert');
                    alerta.removeClass('d-none');
    
                    if (cursoEnEspera) {
                        alerta.html(`
                            <div class="alert alert-info mt-3 mx-3" role="alert">
                                <strong>Este curso aún no ha iniciado.</strong><br>
                                Debes esperar al inicio del curso para poder finalizarlo o asignar calificaciones.
                            </div>
                        `);
                    } else if (cursoReiniciado) {
                        alerta.html(`
                            <div class="alert alert-secondary mt-3 mx-3" role="alert">
                                <strong>Este curso ha sido reiniciado.</strong> Ya puedes modificar las fechas de inicio y fin.
                            </div>
                        `);
                    } else if (!cursoCulminado) {
                        alerta.html(`
                            <div class="alert alert-warning mt-3 mx-3" role="alert">
                                <strong>Nota:</strong> Este curso aún no ha sido finalizado. Primero debe finalizarlo para poder asignar las calificaciones.
                            </div>
                        `);
                    } else {
                        alerta.html(`
                            <div class="alert alert-success mt-3 mx-3" role="alert">
                                <strong>Curso finalizado:</strong> Ya puede asignar las calificaciones a los participantes.
                            </div>
                        `);
                    }
    
                    // Si no hay participantes
                    if (!participantes.length) {
                        lista.html(`
                            <div class="text-center text-muted my-4">
                                <i class="fas fa-user-slash fa-2x mb-2"></i><br>
                                No hay participantes inscritos en este curso.
                            </div>
                        `);
                        $('#cursoModal').modal('hide');
                    } else {
                        participantes.forEach(participante => {
                            const estado = participante.estatus_participante;
                            const selectHtml = `
                                <select class="form-select form-select-sm w-auto estado-select" style="max-width: 140px;" data-id="${participante.id_participante_curso}" ${(cursoCulminado && !cursoReiniciado) ? '' : 'disabled'}>
                                    <option value="" disabled ${!estado ? 'selected' : ''}>Seleccionar</option>
                                    <option value="Aprobado" ${estado === 'Aprobado' ? 'selected' : ''}>Aprobado</option>
                                    <option value="Reprobado" ${estado === 'Reprobado' ? 'selected' : ''}>Reprobado</option>
                                    <option value="Ausente" ${estado === 'Ausente' ? 'selected' : ''}>Ausente</option>
                                </select>
                            `;
    
                            const item = `
                                <div class="list-group-item list-group-item-action d-flex align-items-center justify-content-between py-3">
                                    <div class="d-flex align-items-center w-100">
                                        <div style="flex-grow: 1;">
                                            <span class="d-block">${participante.nombre} ${participante.apellido}</span>
                                            <small class="text-muted">C.I. ${participante.cedula}</small>
                                        </div>
                                        <div>
                                            ${selectHtml}
                                        </div>
                                    </div>
                                </div>
                            `;
    
                            lista.append(item);
                        });
    
                        $('#cursoModal').modal('show');
                    }
    
                    $('#contadorEstudiantes').text(
                        `${participantes.length} estudiante${participantes.length !== 1 ? 's' : ''}`
                    );
                })
                .catch(error => {
                    console.error("Error al obtener los participantes:", error);
                    alert("Hubo un problema al obtener los participantes.");
                });
        });
    
        // Botón "Finalizar"
        $('#btnFinalizar').on('click', function () {
            const idCurso = $(this).data('id');
    
            fetch(`../../app/controlador/Curso/obtenerCurso.php?id_curso=${idCurso}`)
                .then(res => res.json())
                .then(curso => {
                    const fechaFin = new Date(curso.fecha_fin);
                    const hoy = new Date();
                    hoy.setHours(0, 0, 0, 0);
    
                    let mensaje = '';
    
                    if (fechaFin > hoy) {
                        mensaje = `
                            <p><strong>¡Atención!</strong> La fecha de finalización del curso aún no ha llegado (<strong>${curso.fecha_fin}</strong>).</p>
                            <p>¿Deseas finalizar el curso <strong>${curso.nombre_curso}</strong> antes de tiempo?</p>
                        `;
                    } else {
                        mensaje = `
                            <p>¿Deseas finalizar el curso <strong>${curso.nombre_curso}</strong> ahora?</p>
                        `;
                    }
    
                    $('#mensajeConfirmacionCurso').html(mensaje);
                    $('#modal-confirmFinalizarCurso').modal('show');
                    $('#confirmarFinalizarCurso').data('id', idCurso);
                })
                .catch(error => {
                    console.error("Error al obtener curso:", error);
                    alert("Hubo un problema al obtener los datos del curso.");
                });
        });
    
        // Confirmar finalización
        $('#confirmarFinalizarCurso').on('click', function () {
            const idCurso = $(this).data('id');
    
            fetch('../../app/controlador/Curso/finalizarCurso.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_curso: idCurso })
            })
                .then(res => res.json())
                .then(response => {
                    if (response.success) {
                        $('#modal-confirmFinalizarCurso').modal('hide');
                        $('.button.config[data-id="' + idCurso + '"]').click();
                        cargarTablaCursos();
                        toastr.success("¡Curso finalizado correctamente!");
                    } else {
                        alert('Error al finalizar el curso');
                    }
                })
                .catch(error => {
                    console.error("Error al finalizar curso:", error);
                    alert("No se pudo finalizar el curso.");
                });
        });
    
        // Guardar cambios
$('#btnGuardar').on('click', function () {
    const idCurso = $(this).data('id');
    const participantesNotas = [];

    let faltanNotas = false;

    $('.estado-select').each(function () {
        const estado = $(this).val();
        const idParticipanteCurso = $(this).data('id');
        const nombre = $(this).closest('.list-group-item').find('.d-block').text();
        const cedula = $(this).closest('.list-group-item').find('.text-muted').text().replace('C.I. ', '');

        if (!estado) {
            toastr.error("Debes asignar una nota a todos los participantes.");
            faltanNotas = true;
            return false;
        }

        participantesNotas.push({
            id_participante_curso: idParticipanteCurso,
            estado: estado,
            nombre: nombre,
            cedula: cedula
        });
    });

    if (faltanNotas || participantesNotas.length === 0) return;

    let listaNotas = '';
    participantesNotas.forEach(nota => {
        listaNotas += `
            <li>
                <div class="d-flex justify-content-between">
                    <span><strong>${nota.nombre} (C.I. ${nota.cedula}):</strong></span>
                    <span>${nota.estado}</span>
                </div>
            </li>
        `;
    });

    // Mostrar modal de confirmación y ocultar el modal del curso
    $('#confirmarListaNotas').html(listaNotas);
    $('#confirmarGuardarModal').modal('show');
    $('#cursoModal').modal('hide'); // Cerrar el modal de curso cuando el modal de confirmación se abre

    $('#confirmarGuardarBtn').off('click').on('click', function () {
        $.ajax({
            url: '../../app/controlador/Curso/guardarNotas.php',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                id_curso: idCurso,
                participantes_notas: participantesNotas
            }),
            success: function (response) {
                if (response.success) {
                    toastr.success("¡Notas guardadas correctamente!");
                    // Cerrar ambos modales
                    $('#confirmarGuardarModal').modal('hide'); // Cierra el modal de confirmación de guardado
                    $('#cursoModal').modal('hide'); // Cierra el modal de curso también
                    cargarTablaCursos(); // Recargar la tabla de cursos
                } else {
                    toastr.error(response.error || 'Hubo un error al guardar las notas.');
                }
            },
            error: function() {
                toastr.error("Hubo un error al procesar la solicitud.");
            }
        });
    });
});

// Cancelar acción en el modal de confirmación
$('#confirmarGuardarModal').on('hidden.bs.modal', function () {
    $('#cursoModal').modal('show'); // Mostrar de nuevo el cursoModal cuando se cierra confirmarGuardarModal
});



    
        // Clic en botón "Reiniciar Curso"
        $('#btnReiniciarCurso').on('click', function () {
            $('#modalReiniciarCurso').modal('show');
            $('#confirmarReinicioCurso').data('id', $(this).data('id'));
        });
    
        function validarFechas() {
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
        
            const fechaInicioStr = $('#nuevaFechaInicio').val();
            const fechaFinStr = $('#nuevaFechaFin').val();
        
            // Resetear errores
            $('#errorFechaInicio, #errorFechaFin').hide().text('');
            let valido = true;
        
            // Validar fecha de inicio si existe
            if (fechaInicioStr) {
                const fechaInicio = new Date(fechaInicioStr);
                if (fechaInicio < hoy) {
                    $('#errorFechaInicio').text('La fecha de inicio no puede ser en el pasado.').show();
                    valido = false;
                }
            }
        
            // Validar solo si ambas fechas existen
            if (fechaInicioStr && fechaFinStr) {
                const fechaInicio = new Date(fechaInicioStr);
                const fechaFin = new Date(fechaFinStr);
        
                if (fechaFin < fechaInicio) {
                    $('#errorFechaFin').text('La fecha final no puede ser anterior a la de inicio.').show();
                    valido = false;
                }
        
                const diferenciaEnDias = (fechaFin - fechaInicio) / (1000 * 60 * 60 * 24);
                if (diferenciaEnDias < 21) {
                    $('#errorFechaFin').text('Debe haber al menos 3 semanas (21 días) entre las fechas.').show();
                    valido = false;
                }
            }
        
            return valido;
        }
        
        // Validación en tiempo real
        $('#nuevaFechaInicio, #nuevaFechaFin').on('change input', function() {
            validarFechas();
        });
        
        // Ajustar fecha mínima de finalización
        $('#nuevaFechaInicio').on('change', function() {
            const fechaInicio = $(this).val();
            if (fechaInicio) {
                const fechaMinFin = new Date(fechaInicio);
                fechaMinFin.setDate(fechaMinFin.getDate() + 21);
                const minFinStr = fechaMinFin.toISOString().split('T')[0];
                $('#nuevaFechaFin').attr('min', minFinStr);
                
                if ($('#nuevaFechaFin').val() && new Date($('#nuevaFechaFin').val()) < fechaMinFin) {
                    $('#nuevaFechaFin').val('');
                }
            }
        });
        
        // Confirmar reinicio
        $('#confirmarReinicioCurso').on('click', function(e) {
            e.preventDefault();
            
            // Validación básica de campos requeridos
            if (!$('#nuevaFechaInicio').val() || !$('#nuevaFechaFin').val()) {
                toastr.warning('Complete correctamente todos los campos marcados');
                return;
            }
        
            if (!validarFechas()) {
                toastr.warning('Verifique los errores en los campos marcados');
                return;
            }
        
            const idCurso = $(this).data('id');
            const nuevaFechaInicio = $('#nuevaFechaInicio').val();
            const nuevaFechaFin = $('#nuevaFechaFin').val();
        
            $.ajax({
                url: '../../app/controlador/Curso/reiniciarCurso.php',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    id_curso: idCurso,
                    nueva_fecha_inicio: nuevaFechaInicio,
                    nueva_fecha_fin: nuevaFechaFin
                }),
                success: function(response) {
                    if (response.success) {
                        toastr.success("¡Curso reiniciado correctamente!");
                        $('#modalReiniciarCurso').modal('hide');
                        cargarTablaCursos();
                    } else {
                        toastr.success("¡Curso reiniciado correctamente!");
                        $('#modalReiniciarCurso').modal('hide');
                        cargarTablaCursos();
                    }
                },
                error: function() {
                    toastr.error("Error del servidor.");
                }
            });
        });
        
        // Manejo del modal
        $('#modalReiniciarCurso').on('show.bs.modal', function() {
            $('#cursoModal').modal('hide');
            const hoy = new Date().toISOString().split('T')[0];
            $('#nuevaFechaInicio, #nuevaFechaFin').val('');
            $('#nuevaFechaInicio').attr('min', hoy);
            $('#nuevaFechaFin').attr('min', hoy);
            $('#errorFechaInicio, #errorFechaFin').hide().text('');
        });
        
        // Cancelar
        $(document).on('click', '.btn-cancel-reiniciar', function() {
            $('#modalReiniciarCurso').modal('hide');
            $('#cursoModal').modal('show');
        });
    });
    