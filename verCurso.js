document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (event) {
      if (event.target.closest('.view')) {
        const cursoId = event.target.closest('.view').getAttribute('data-id');
  
        if (cursoId) {
          // Cargar información del curso
          fetch(`../../app/controlador/Curso/verCurso.php?id=${cursoId}`)
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                const curso = data.data;
  
                // Llenar los campos del modal con la información del curso
                document.getElementById('nombre-view').textContent = curso.nombre || '-';
                document.getElementById('programaFormación-view').textContent = curso.programa_formacion === 'Programa de Formación Productiva (PFP)' ? 'PFP' : '-';
                document.getElementById('modalidad-view').textContent = curso.modalidad || '-';
                document.getElementById('turno-view').textContent = curso.turno || '-';
                document.getElementById('tipoFormacion-view').textContent = curso.tipoFormacion || '-';
                document.getElementById('motor-view').textContent = curso.motor || '-';
                document.getElementById('areaFormativa-view').textContent = curso.areaFormativa || '-';
                document.getElementById('sectorEconomico-view').textContent = curso.sectorEconomico || '-';
                document.getElementById('ambito-view').textContent = curso.ambito || '-';
                document.getElementById('cupos-view').textContent = curso.maxParticipantes || '-';
                document.getElementById('estadoCurso-view').textContent = curso.estado || '-';
                // Actualizar data-id del botón de matrícula
               $('#btn-matricula-pdf').data('id', cursoId);
  
                // Corregir fechas sumando 1 día
                const fechaInicio = new Date(curso.fechaInicio);
                fechaInicio.setDate(fechaInicio.getDate() + 1);
  
                const fechaFin = new Date(curso.fechaCulminacion);
                fechaFin.setDate(fechaFin.getDate() + 1);
  
                const fechaActual = new Date();
  
                document.getElementById('fechaInicio-view').textContent = formatDate(fechaInicio);
                document.getElementById('fechaCulminación-view').textContent = formatDate(fechaFin);
  
                // Badge de estado
                const estadoBadge = document.getElementById('estadoCurso-view');
                let colorEstado = '';
                let mostrarBarraProgreso = false;
  
                switch (curso.estado) {
                  case 'En espera':
                    colorEstado = 'bg-secondary';
                    mostrarBarraProgreso = true;
                    break;
                  case 'En proceso':
                    colorEstado = 'bg-success';
                    mostrarBarraProgreso = true;
                    break;
                  case 'Culminado':
                    colorEstado = 'bg-danger';
                    mostrarBarraProgreso = true;
                    break;
                  case 'Aprobado':
                    colorEstado = 'bg-primary';
                    mostrarBarraProgreso = true;
                    break;
                  default:
                    colorEstado = 'bg-dark';
                    break;
                }
  
                estadoBadge.className = `badge ${colorEstado}`;
  
                // Docente
                // Obtener datos del docente asociado al curso
                fetch(`../../app/controlador/Curso/obtenerDocente.php?id=${cursoId}`)
                .then(response => response.json())
                .then(docenteData => {
                  const defaultText = 'No asignado';
              
                  if (docenteData.success) {
                    const d = docenteData.docente;
                    document.getElementById('docente-nombre').textContent = d.nombre || defaultText;
                    document.getElementById('docente-cedula').textContent = d.cedula || defaultText;
                    document.getElementById('docente-edad').textContent = d.edad || defaultText;
                  } else {
                    document.getElementById('docente-nombre').textContent = defaultText;
                    document.getElementById('docente-cedula').textContent = defaultText;
                    document.getElementById('docente-edad').textContent = defaultText;
                    console.warn(docenteData.message);
                  }
                })
                .catch(err => {
                  console.error('Error obteniendo docente:', err);
                  document.getElementById('docente-nombre').textContent = 'No asignado';
                  document.getElementById('docente-cedula').textContent = 'No asignado';
                  document.getElementById('docente-edad').textContent = 'No asignado';
                });
              

  
                // Círculo de cupo
                const max = curso.maxParticipantes || 0;
                const inscritos = curso.numInscritos || 0;
                const porcentajeCupos = max ? (inscritos / max) * 100 : 0;
  
                const radius = 45;
                const circumference = 2 * Math.PI * radius;
                const progressCircle = document.getElementById('progress-circle');
                const circleText = document.getElementById('circle-text');
                progressCircle.style.strokeDasharray = `${(porcentajeCupos / 100) * circumference} ${circumference}`;
                circleText.textContent = `${Math.round(porcentajeCupos)}%`;
  
                // Mostrar u ocultar progreso temporal
                const progressBar = document.getElementById('progress-bar');
                const temporalProgress = document.querySelector('.temporal-progress');
                const progressCircleWrapper = document.querySelector('.progress-circle');
  
                if (mostrarBarraProgreso) {
                  const total = fechaFin - fechaInicio;
                  const transcurrido = fechaActual - fechaInicio;
                  const porcentaje = (transcurrido / total) * 100;
  
                  progressBar.style.width = `${Math.min(100, Math.max(0, porcentaje))}%`;
                  temporalProgress.style.display = 'block';
                  progressCircleWrapper.style.display = 'block';
                } else {
                  progressBar.style.width = '0%';
                  temporalProgress.style.display = 'none';
                  progressCircleWrapper.style.display = 'none';
                }
  
                // Cargar los participantes con jQuery (usando $.ajax)
                cargarParticipantes(cursoId);
  
              } else {
                console.error('Error en datos:', data.message);
              }
            })
            .catch(error => console.error('Error en solicitud:', error));
        }
      }
    });
  
    // Función para cargar los participantes del curso con $.ajax
    function cargarParticipantes(idCurso) {
      const $tablaParticipantes = $('#tabla-participantes');  // Sección de la tabla de participantes
      $tablaParticipantes.empty();  // Limpiar la tabla antes de llenarla
  
      $.ajax({
        url: '../../app/controlador/Curso/obtenerInscritos.php',
        method: 'GET',
        dataType: 'json',
        data: { id_curso: idCurso },
        success: function(response) {
          if (response && response.length > 0) {
            response.forEach(p => {
              $tablaParticipantes.append(`
                <tr>
                  <td>${p.cedula}</td>
                  <td>${p.nombre}</td>
                  <td>${p.apellido}</td>
                  <td>${p.edad}</td>
                  <td>${p.genero}</td>
                </tr>
              `);
            });
          } else {
            $tablaParticipantes.append('<tr><td colspan="5" class="text-muted text-center">No hay participantes inscritos</td></tr>');
          }
        },
        error: function() {
          $tablaParticipantes.html('<tr><td colspan="5" class="text-danger text-center">Error cargando inscritos</td></tr>');
        }
      });
    }
  
    // Función para formatear las fechas
    function formatDate(date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  });
  

// ========== EVENTO PARA DESCARGAR MATRÍCULA PDF ==========
$(document).on('click', '#btn-matricula-pdf', function(e) {
    e.preventDefault();
    const cursoId = $(this).data('id');
    
    if (cursoId) {
        // Ruta relativa corregida y política de seguridad
        window.open(
            `../../app/controlador/fpdf/CursoMatricula.php?id=${cursoId}`,
            '_blank',
            'noopener,noreferrer'
        );
    } else {
        console.error('ID de curso no encontrado:', cursoId);
        toastr.error('Error: No se pudo identificar el curso');
    }
});