// Función para cagar la pagina con paginación
$(document).ready(function () {
    let currentPage = 1; // Página actual
    let recordsPerPage = 8; // Registros por página (valor inicial)

    // Función para cargar los registros con paginación
    function cargarRegistros(page, perPage) {
        $.ajax({
            url: '../../app/controlador/obtenerParticipantes.php',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                data.sort((a, b) => a.id_participante - b.id_participante);
                const totalRecords = data.length; // Total de registros
                const totalPages = perPage === 'Todos' ? 1 : Math.ceil(totalRecords / perPage); // Calcular páginas totales
                let start = (page - 1) * perPage; // Índice inicial
                let end = start + parseInt(perPage); // Índice final

                // Si selecciona "Todos", mostramos todos los registros
                if (perPage === 'Todos') {
                    start = 0;
                    end = totalRecords;
                }

                let rows = '';
                const slicedData = data.slice(start, end); // Obtener registros de la página actual

                if (slicedData.length > 0) {
                    slicedData.forEach(participante => {
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
                                <td>
                                    <!-- Botones de acción -->
                                    <a href="#"><button class='button view' title="Ver Participante"   data-id="${participante.id_participante}" data-bs-toggle='modal' data-bs-target='#modal-viewParticipante'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#fff' class='bi bi-binoculars' viewBox='0 0 16 16'>
                                    <path d='M3 2.5A1.5 1.5 0 0 1 4.5 1h1A1.5 1.5 0 0 1 7 2.5V5h2V2.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5v2.382a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V14.5a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 14.5v-3a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5v3A1.5 1.5 0 0 1 5.5 16h-3A1.5 1.5 0 0 1 1 14.5V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882zM4.5 2a.5.5 0 0 0-.5.5V3h2v-.5a.5.5 0 0 0-.5-.5zM6 4H4v.882a1.5 1.5 0 0 1-.83 1.342l-.894.447A.5.5 0 0 0 2 7.118V13h4v-1.293l-.854-.853A.5.5 0 0 1 5 10.5v-1A1.5 1.5 0 0 1 6.5 8h3A1.5 1.5 0 0 1 11 9.5v1a.5.5 0 0 1-.146.354l-.854.853V13h4V7.118a.5.5 0 0 0-.276-.447l-.895-.447A1.5 1.5 0 0 1 12 4.882V4h-2v1.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm4-1h2v-.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm4 11h-4v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zm-8 0H2v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5z'/>
                                    </svg></button></a>

                                    <a href="#"><button class='button curso' title="Asignar Curso"  data-id="${participante.id_participante}" data-bs-toggle='modal' data-bs-target='#modal-AsignarCursoParticipante'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#fff' class='bi bi-journal-bookmark-fill' viewBox='0 0 16 16'>
                                    <path fill-rule='evenodd' d='M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z'/>
                                    <path d='M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2'/>
                                    <path d='M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z'/>
                                    </svg></button></a>

                                    <a href="#"><button class='button edit' title="Editar Participante" data-id="${participante.id_participante}" data-bs-toggle='modal' data-bs-target='#modal-editParticipante'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil' viewBox='0 0 16 16'>
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
                } else {
                    rows = '<tr><td colspan="10" class="text-center">No hay participantes registrados</td></tr>';
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


                // Renderizar la paginación
                renderizarPaginacion(totalPages, page);
            },
            error: function () {
                const rows = '<tr><td colspan="10" class="text-center">Error en la solicitud. Por favor, inténtelo más tarde.</td></tr>';
                $('#tabla-participantes tbody').html(rows);
            }
        });
    }

// Función para renderizar la paginación
function renderizarPaginacion(totalPages, activePage) {
    let paginationHTML = `
        <li class="page-item ${activePage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="1">Primero</a>
        </li>
        <li class="page-item ${activePage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${activePage - 1}">Anterior</a>
        </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <li class="page-item ${activePage === i ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }

    paginationHTML += `
        <li class="page-item ${activePage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${activePage + 1}">Siguiente</a>
        </li>
        <li class="page-item ${activePage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${totalPages}">Último</a>
        </li>
    `;

    $('.pagination').html(paginationHTML);
}

// Event listener para cambiar la página
$(document).on('click', '.pagination .page-link', function (e) {
    e.preventDefault();
    const newPage = parseInt($(this).data('page'));
    if (!isNaN(newPage)) {
        currentPage = newPage;
        cargarRegistros(currentPage, recordsPerPage);
    }
});

// Event listener para cambiar la cantidad de registros por página
$('#registros').on('change', function () {
    recordsPerPage = $(this).val();
    currentPage = 1; // Reiniciar a la primera página
    cargarRegistros(currentPage, recordsPerPage);
});

// Cargar registros inicialmente
cargarRegistros(currentPage, recordsPerPage);


// Reiniciar los filtros
$('#btn-filter').on('click', function (event) {
    event.preventDefault(); 
    cargarRegistros(currentPage,recordsPerPage);

    // Reiniciar los valores de los filtros
    $('#sexo-filter').val(''); 
    $('#edad-filter').val(''); 
    $('#estado-filter').val(''); 
});
});

