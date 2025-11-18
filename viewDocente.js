$(document).ready(function () {
    $(document).on('click', '.button.view', function () {
        const idDocente = $(this).data('id');

        fetch(`../../app/controlador/Docente/verDocente.php?id=${idDocente}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const docente = data.data;

                    // Mostrar datos personales
                    $("#nombre-view").text(docente.nombre);
                    $("#apellido-view").text(docente.apellido);
                    $("#cedula-view").text(docente.cedula);
                    $("#telefono-view").text("0" + docente.telefono);
                    $("#edad-view").text(docente.edad);
                    $("#fechaNacimiento-view").text(docente.fechaNacimiento);
                    $("#sexo-view").text(docente.genero);
                    $("#correo-view").text(docente.correo);

                    // Estado del docente con badge
                    const estadoEl = $("#estado-view");
                    estadoEl.removeClass().addClass("badge");

                    if (docente.estado === 'En formación') {
                        estadoEl.addClass("bg-success").text(docente.estado);
                    } else if (docente.estado === 'Disponible') {
                        estadoEl.addClass("bg-warning text-dark").text(docente.estado);
                    } else if (docente.estado === 'Asignado') {
                        estadoEl.addClass("bg-primary").text(docente.estado);
                    } else {
                        estadoEl.text(docente.estado);
                    }

                    // Mostrar cursos asociados
                    const cursosContainer = $("#cursos-asociados");
                    cursosContainer.empty();

                    if (docente.cursos && docente.cursos.length > 0) {
                        docente.cursos.forEach(curso => {
                            const badgeEstado = curso.estado === 'En espera'
                                ? '<span class="badge bg-secondary">En espera</span>'
                                : curso.estado === 'En proceso'
                                    ? '<span class="badge bg-success">En proceso</span>'
                                    : curso.estado === 'Culminado'
                                        ? '<span class="badge bg-danger">Culminado</span>'
                                        : curso.estado === 'Aprobado'
                                            ? '<span class="badge bg-primary">Aprobado</span>'
                                            : '<span class="badge bg-dark">Desconocido</span>';

                            cursosContainer.append(`
                                <div class="col-md-6">
                                    <div class="card border shadow-sm">
                                        <div class="card-body">
                                            <h6 class="card-title">${curso.nombre}</h6>
                                            <p class="card-text">${badgeEstado}</p>
                                        </div>
                                    </div>
                                </div>
                            `);
                        });
                    } else {
                        cursosContainer.append(`<div class="alert alert-info">No tiene cursos asociados.</div>`);
                    }

                    $('#btn-constanciaDocente-pdf').data('id', idDocente); // Actualizar data-id ✅
                    
                    // Mostrar modal
                    $("#modal-viewDocente").modal("show");
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => console.error('Error al obtener los datos:', error));
    });
});


$(document).on('click', '#btn-constanciaDocente-pdf', function(e) {
    e.preventDefault();
    const idDocente = $(this).data('id'); // Obtener ID usando .data()
    
    if (idDocente) {
        window.open(
            `../../app/controlador/fpdf/constanciaDocente.php?id=${idDocente}`,
            '_blank',
            'noopener,noreferrer'
        );
    } else {
        console.error('ID del docente no encontrado');
        toastr.error('Error: No se pudo generar la constancia');
    }
});