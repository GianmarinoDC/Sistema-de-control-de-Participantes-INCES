const reportes = [
    { id: 1, nombre: "Total de Participantes", icono: `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z"/>
  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
</svg>`, color: "primary" },
    { id: 2, nombre: "Cursos por Área Formativa", icono: `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#198754" class="bi bi-bar-chart-line-fill" viewBox="0 0 16 16">
  <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1z"/>
</svg>`, color: "success" },
    { id: 3, nombre: "Evolución Mensual", icono: `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#0dcaf0" class="bi bi-graph-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"/>
</svg>`, color: "info" },
    { id: 4, nombre: "Participantes por Género", icono: `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#212529" class="bi bi-people-fill" viewBox="0 0 16 16">
  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
</svg>`, color: "black" },
    { id: 5, nombre: "Ocupación de Cursos", icono: `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#FFC107" class="bi bi-person-fill-up" viewBox="0 0 16 16">
  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.854 1.5 1.5a.5.5 0 0 1-.708.708L13 11.707V14.5a.5.5 0 0 1-1 0v-2.793l-.646.647a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
</svg>`, color: "warning" },
    { id: 6, nombre: "Rendimiento Académico", icono: `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#6c757d" class="bi bi-person-workspace" viewBox="0 0 16 16">
  <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
  <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z"/>
</svg>`, color: "secondary" },
{ id: 7, nombre: "Generar Constancias", icono: `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#dc3545" class="bi bi-file-earmark-text" viewBox="0 0 16 16">
  <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
  <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
</svg>`, color: "danger" }
];


  
const cardsContainer = document.getElementById('cardsContainer');
const reportContainer = document.getElementById('reportContainer');

// Limpiar el contenedor primero
cardsContainer.innerHTML = '';

// Crear las filas manualmente para mejor control
const row1 = document.createElement('div');
row1.className = 'row mb-4';
const row2 = document.createElement('div');
row2.className = 'row mb-4';
const row3 = document.createElement('div');
row3.className = 'row mb-4';

// Agregar filas al contenedor
cardsContainer.appendChild(row1);
cardsContainer.appendChild(row2);
cardsContainer.appendChild(row3);

// Crear tarjetas dinámicas y asignar a las filas correspondientes
reportes.forEach((reporte, index) => {
    const card = document.createElement('div');
    
    // Asignar a las filas correctas
    if (index < 3) {
        card.className = "col-md-4";
        row1.appendChild(card);
    } else if (index < 6) {
        card.className = "col-md-4";
        row2.appendChild(card);
    } else {
        // Para el reporte 7 (índice 6)
        card.className = "col-md-4 offset-md-4";
        row3.appendChild(card);
    }
    
    card.innerHTML = `
        <div class="card card-report shadow-sm border-0 h-100">
            <div class="card-body text-center">
                <div class="icono-reporte mb-3">${reporte.icono}</div>
                <h5 class="card-title fw-bold text-${reporte.color}">${reporte.nombre}</h5>
            </div>
        </div>
    `;
    card.addEventListener('click', () => cargarReporte(reporte.id));
});

  
  function cargarReporte(idReporte) {
    reportContainer.innerHTML = `<div class="text-center text-muted py-5">Cargando reporte...</div>`;
  
    setTimeout(() => {
      switch (idReporte) {
        case 1:
          cargarTotalCursos();
          break;
        case 2:
          cargarCursosPorArea();
          break;
        case 3:
          cargarEvolucionMensual();
          break;
        case 4:
          cargarParticipantesGenero();
          break;
        case 5:
          cargarOcupacionCursos();
          break;
        case 6:
          cargarRendimientoAcademico();
          break;
        case 7:
          cargarGenerarConstancias();
          break;
        default:
          reportContainer.innerHTML = `<p class="text-danger text-center">Reporte no encontrado.</p>`;
      }
    }, 300);
  }


  
  // Funciones de carga individuales 

  function cargarTotalCursos() {
    fetch('../../app/controlador/Reporte/api_total_cursos.php')
      .then(response => response.json())
      .then(data => {
        const reportContainer = document.getElementById('reportContainer');
        reportContainer.innerHTML = '';
  
        if (data.total_actual !== undefined && data.total_participantes_actual !== undefined) {
          const container = document.createElement('div');
          container.className = 'card card-kpi shadow-lg p-5 mb-4';
  
          container.innerHTML = `
            <div class="card-body">
              <div class="row text-center">
                <div class="col-md-6 border-end">
                  <div class="fs-1 mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#0d6efd" class="bi bi-people-fill" viewBox="0 0 16 16">
  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
</svg></div>
                  <h5 class="card-title mt-2">Total de Participantes Registrados</h5>
                  <h2 class="display-4 fw-bold text-primary">${data.total_participantes_actual}</h2>
                  <p class="mt-3 ${data.variacion_participantes >= 0 ? 'text-success' : 'text-danger'}">
                    ${data.variacion_participantes >= 0 ? '▲' : '▼'} ${Math.abs(data.variacion_participantes)}% vs mes anterior
                  </p>
                </div>
                <div class="col-md-6">
                  <div class="fs-1 mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#0d6efd" class="bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z"/>
  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
</svg></div>
                  <h5 class="card-title mt-2">Total de Cursos Agregados</h5>
                  <h2 class="display-4 fw-bold text-primary">${data.total_actual}</h2>
                  <p class="mt-3 ${data.variacion >= 0 ? 'text-success' : 'text-danger'}">
                    ${data.variacion >= 0 ? '▲' : '▼'} ${Math.abs(data.variacion)}% vs mes anterior
                  </p>
                </div>
              </div>
            </div>
          `;
  
          const botonesContainer = document.createElement('div');
          botonesContainer.className = 'd-flex justify-content-center align-items-center gap-3 my-4';
          botonesContainer.innerHTML = `
            <button id="desglosarGrafica" class="btn btn-primary btn-lg">
               Ver Gráfica Detallada
            </button>
          `;
  
          const graficoContainer = document.createElement('div');
          graficoContainer.id = 'graficoContainer';
          graficoContainer.className = 'mt-5';
  
          container.appendChild(botonesContainer);
          container.appendChild(graficoContainer);
          reportContainer.appendChild(container);
  
          // Desplazamiento hacia la tarjeta generada
          setTimeout(() => {
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
  
          document.getElementById('desglosarGrafica').addEventListener('click', generarGraficoInteractivo);
        } else {
          reportContainer.innerHTML = `<div class="text-warning text-center">Datos incompletos recibidos de la API.</div>`;
        }
      })
      .catch(error => {
        document.getElementById('reportContainer').innerHTML = `<div class="text-danger text-center">Error cargando datos.</div>`;
        console.error('Error:', error);
      });
  }
  
  
  function generarGraficoInteractivo() {
    const container = document.getElementById('graficoContainer');
    container.innerHTML = `
      <style>
        #graficoCursos {
          max-height: 400px !important;
          height: 400px !important;
        }
      </style>
      <div class="card shadow p-4">
        <div class="row g-3 align-items-end mb-3">
          <div class="col-md-3">
            <label class="form-label">Primer Año</label>
            <select id="primerAnio" class="form-select form-select-sm"></select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Segundo Año</label>
            <select id="segundoAnio" class="form-select form-select-sm"></select>
          </div>
          
          <div class="col-md-3">
            <label class="form-label">Tipo de Gráfico</label>
            <select id="tipoGrafico" class="form-select form-select-sm">
              <option value="line">Línea</option>
              <option value="bar">Barras</option>
              <option value="radar">Radar</option>
            </select>
          </div>

          <div class="col-md-3">
          <button id="descargarGrafico" class="btn btn-success btn-sm">
            Descargar Gráfico como Imagen
          </button>
        </div>

        </div>
  

        <div class="col-md-3 d-none">
            <label class="form-label">Área Formativa</label>
            <select id="areaFiltro" class="form-select form-select-sm">
              <option value="">Todas</option>
            </select>
          </div>
  
        <div class="chart-container" style="position: relative; width: 100%;">
          <canvas id="graficoCursos"></canvas>
        </div>
      </div>
    `;

    // Función para actualizar las opciones del segundo año
    const actualizarOpcionesAnio = (selectObjetivo, valorExcluido) => {
        const select = document.getElementById(selectObjetivo);
        const opcionesOriginales = window.aniosDisponibles;
        
        // Filtrar años excluyendo el seleccionado en el otro select
        const opcionesFiltradas = opcionesOriginales.filter(anio => anio != valorExcluido);
        
        // Generar nuevas opciones
        select.innerHTML = opcionesFiltradas
            .map(anio => `<option value="${anio}">${anio}</option>`)
            .join('');
        
        // Validar selección actual
        if (!opcionesFiltradas.includes(select.value)) {
            select.value = opcionesFiltradas[0] || '';
        }
    };


    cargarAniosSelect();
    cargarAreasFormativas();
    cargarDatosGrafico();


    document.getElementById('areaFiltro').addEventListener('change', cargarDatosGrafico);
    document.getElementById('tipoGrafico').addEventListener('change', cargarDatosGrafico);

    document.getElementById('descargarGrafico').addEventListener('click', () => {
        const canvas = document.getElementById('graficoCursos');
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'grafico_participantes.png';
        link.click();
    });
}
  
function cargarAniosSelect() {
  const primerAnio = document.getElementById('primerAnio');
  const segundoAnio = document.getElementById('segundoAnio');
  const anioActual = new Date().getFullYear();
  const aniosDisponibles = Array.from({length: 6}, (_, i) => anioActual - i);

  const actualizarOpciones = (select, excludeYear) => {
      select.innerHTML = aniosDisponibles
          .filter(y => y !== excludeYear)
          .map(y => `<option value="${y}" ${y === parseInt(select.value) ? 'selected' : ''}>${y}</option>`)
          .join('');
  };

  const validarSelecciones = () => {
      const valorPrimero = parseInt(primerAnio.value);
      const valorSegundo = parseInt(segundoAnio.value);
      
      if (valorPrimero === valorSegundo) {
          const alternativas = aniosDisponibles.filter(y => y !== valorPrimero);
          const nuevoValor = alternativas.length > 0 ? alternativas[0] : null;
          
          if (primerAnio === document.activeElement) {
              segundoAnio.value = nuevoValor;
              actualizarOpciones(segundoAnio, valorPrimero);
          } else {
              primerAnio.value = nuevoValor;
              actualizarOpciones(primerAnio, valorSegundo);
          }
      }
  };

  // Inicialización
  primerAnio.value = anioActual;
  segundoAnio.value = anioActual - 1;
  actualizarOpciones(segundoAnio, anioActual);
  actualizarOpciones(primerAnio, anioActual - 1);

  // Manejador de eventos unificado
  const manejarCambio = (event) => {
      const selectModificado = event.target;
      const otroSelect = selectModificado === primerAnio ? segundoAnio : primerAnio;
      const nuevoValor = parseInt(selectModificado.value);
      
      actualizarOpciones(otroSelect, nuevoValor);
      validarSelecciones();
      
      // Actualizar gráfico después de cambios
      setTimeout(() => cargarDatosGrafico(), 50);
  };

  primerAnio.addEventListener('change', manejarCambio);
  segundoAnio.addEventListener('change', manejarCambio);
}
  

  function cargarAreasFormativas() {
    fetch('../../app/controlador/Reporte/api_areas_formativas.php')
      .then(response => response.json())
      .then(data => {
        const select = document.getElementById('areaFiltro');
        data.forEach(area => {
          const option = document.createElement('option');
          option.value = area.id;
          option.textContent = area.nombre;
          select.appendChild(option);
        });
      })
      .catch(error => console.error('Error al cargar áreas formativas:', error));
  }
  
  function cargarDatosGrafico() {
    const anio1 = document.getElementById('primerAnio').value;
    const anio2 = document.getElementById('segundoAnio').value;
    const area = document.getElementById('areaFiltro').value;
    const tipoGrafico = document.getElementById('tipoGrafico').value;
  
    if (!anio1 || !anio2) return;
  
    let url = `../../app/controlador/Reporte/api_datos_grafico_participantes.php?anios=${anio1},${anio2}`;
    if (area) url += `&areaFormativa=${encodeURIComponent(area)}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const canvas = document.getElementById('graficoCursos');
        const ctx = canvas.getContext('2d');
  
        if (window.graficoInstance) {
          window.graficoInstance.destroy();
        }
  
        const datasets = data.map((anioData, index) => ({
          label: `Año ${anioData.anio}`,
          data: anioData.participantes,
          backgroundColor: index === 0 ? 'rgba(54, 162, 235, 0.5)' : 'rgba(255, 99, 132, 0.5)',
          borderColor: index === 0 ? 'rgba(54, 162, 235, 1)' : 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          tension: 0.4,
          fill: tipoGrafico === 'line'
        }));
  
        window.graficoInstance = new Chart(ctx, {
          type: tipoGrafico,
          data: {
            labels: data[0].meses,
            datasets: datasets
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: { mode: 'index', intersect: false },
              legend: { position: 'top' },
              title: { display: true, text: 'Comparación de Participantes entre Años' }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      })
      .catch(error => {
        console.error('Error al cargar gráfico:', error);
      });
  }

  
function cargarCursosPorArea() {
    const reportContainer = document.getElementById('reportContainer');
  
    reportContainer.innerHTML = `
      <h3 class="fw-bold mb-4 text-center">Cursos por Área Formativa</h3>
      <div class="filter-container mb-4">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <label class="fw-bold mb-2"><strong>Filtrar áreas:</strong></label>
            <select id="areaSelect" class="form-select" multiple style="height: auto; min-height: 120px;">
              <!-- Opciones se llenarán dinámicamente -->
            </select>
            <div class="mt-2">
              <button id="selectAllAreas" class="btn btn-sm btn-outline-primary me-2">Seleccionar todo</button>
              <button id="deselectAllAreas" class="btn btn-sm btn-outline-secondary">Deseleccionar todo</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center" id="graficoSeccionCursosArea">
        <div class="col-md-6 mb-4">
          <div class="card shadow-sm p-3">
            <h5 class="text-center">Distribución de Cursos</h5>
            <canvas id="graficoCursosArea" width="400" height="400"></canvas>
          </div>
        </div>
        <div class="col-md-6 mb-4">
          <div class="card shadow-sm p-3">
            <h5 class="text-center">Inscritos por Área</h5>
            <canvas id="graficoCursosInscritos" width="400" height="400"></canvas>
          </div>
        </div>
      </div>
      <div class="mt-4 text-center">
        <a target="_blank" href="../../app/controlador/fpdf/Reporte/ReporteCursoArea.php" class="btn btn-danger btn-lg" id="pdfLink">
          Descargar Reporte PDF
        </a>
      </div>
    `;
  
    fetch('../../app/controlador/Reporte/api_cursos_por_area.php')
      .then(response => response.json())
      .then(data => {
        if (data.data) {
          const labels = data.data.map(item => item.area);
          const values = data.data.map(item => item.cantidad);
          const inscritos = data.data.map(item => item.num_inscritos || 0);
          const backgroundColors = [
            '#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f',
            '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab'
          ];
  
          const select = document.getElementById('areaSelect');
          const pdfLink = document.getElementById('pdfLink');
          let graficoDona, graficoBarras;
  
          // Llenar el select múltiple
          labels.forEach((label, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = label;
            option.selected = true;
            select.appendChild(option);
          });
  
          const updateContent = () => {
            const selectedIndices = Array.from(select.selectedOptions).map(option => parseInt(option.value));
            const selectedAreas = selectedIndices.map(index => encodeURIComponent(labels[index]));
            
            pdfLink.href = `../../app/controlador/fpdf/Reporte/ReporteCursoArea.php?areas=${selectedAreas.join(',')}`;
  
            if (graficoDona && graficoBarras) {
              const filteredLabels = selectedIndices.map(index => labels[index]);
              const filteredValues = selectedIndices.map(index => values[index]);
              const filteredInscritos = selectedIndices.map(index => inscritos[index]);
              const filteredColors = selectedIndices.map(index => backgroundColors[index]);
  
              graficoDona.data.labels = filteredLabels;
              graficoDona.data.datasets[0].data = filteredValues;
              graficoDona.data.datasets[0].backgroundColor = filteredColors;
              graficoDona.update();
  
              graficoBarras.data.labels = filteredLabels;
              graficoBarras.data.datasets[0].data = filteredInscritos;
              graficoBarras.data.datasets[0].backgroundColor = filteredColors;
              graficoBarras.update();
            }
          };
  
          // Botones para seleccionar/deseleccionar todo
          document.getElementById('selectAllAreas').addEventListener('click', () => {
            Array.from(select.options).forEach(option => option.selected = true);
            updateContent();
          });
  
          document.getElementById('deselectAllAreas').addEventListener('click', () => {
            Array.from(select.options).forEach(option => option.selected = false);
            updateContent();
          });
  
          // Evento para cambios en el select
          select.addEventListener('change', updateContent);
  
          // Inicializar gráficos
          const ctxDona = document.getElementById('graficoCursosArea').getContext('2d');
          graficoDona = new Chart(ctxDona, {
            type: 'doughnut',
            data: {
              labels: labels,
              datasets: [{
                data: values,
                backgroundColor: backgroundColors,
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      const dataItem = data.data[tooltipItem.dataIndex];
                      return `${dataItem.area}: ${dataItem.cantidad} cursos (${dataItem.porcentaje}%)`;
                    }
                  }
                }
              }
            }
          });
  
          const ctxBarras = document.getElementById('graficoCursosInscritos').getContext('2d');
          graficoBarras = new Chart(ctxBarras, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: 'Inscritos por Área',
                data: inscritos,
                backgroundColor: backgroundColors,
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => `Inscritos: ${tooltipItem.raw}`
                  }
                }
              },
              scales: {
                y: { beginAtZero: true }
              }
            }
          });
  
          updateContent();
  
          // Desplazamiento suave al contenedor gráfico
          setTimeout(() => {
            const seccion = document.getElementById('graficoSeccionCursosArea');
            seccion?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        } else {
          reportContainer.innerHTML = `<p class="text-warning text-center">No se encontraron datos para el gráfico.</p>`;
        }
      })
      .catch(error => {
        reportContainer.innerHTML = `<p class="text-danger text-center">Error cargando datos: ${error.message}</p>`;
        console.error('Error:', error);
      });
  }


  function cargarEvolucionMensual() {
    reportContainer.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="fw-bold text-info"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#0dcaf0" class="bi bi-graph-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"/>
</svg> Evolución Mensual de Cursos</h3>
        <div>
          <select id="selectAnio1" class="form-select d-inline-block w-auto me-2" onchange="actualizarSelectAnio2(); dibujarGraficoEvolucion();">
            ${generarOpcionesAnios()}
          </select>
          <select id="selectAnio2" class="form-select d-inline-block w-auto me-2" onchange="dibujarGraficoEvolucion()">
            ${generarOpcionesAnios(true)}
          </select>
          <button onclick="descargarGrafico()" class="btn btn-success ms-2">Descargar Imagen</button>
        </div>
      </div>
      <div id="contenedorGrafico" class="position-relative">
        <canvas id="graficoEvolucionMensual" height="100"></canvas>
        <div id="loadingSpinner" class="text-center position-absolute top-50 start-50 translate-middle" style="display:none;">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    `;
  
    actualizarSelectAnio2();
    dibujarGraficoEvolucion();
  
    // Desplazamiento automático
    setTimeout(() => {
      const contenedor = document.getElementById('contenedorGrafico');
      if (contenedor) {
        contenedor.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Pequeño delay para asegurar que el DOM esté renderizado
  }
  

function generarOpcionesAnios(includeBlank = false, excludeYear = null) {
  const anioActual = new Date().getFullYear();
  let opciones = includeBlank ? `<option value="">-- Sin comparar --</option>` : "";
  for (let i = anioActual; i >= anioActual - 5; i--) {
      if (i !== excludeYear) { // Excluir el año especificado
          opciones += `<option value="${i}">${i}</option>`;
      }
  }
  return opciones;
}

function actualizarSelectAnio2() {
  const anio1 = parseInt(document.getElementById('selectAnio1').value);
  const selectAnio2 = document.getElementById('selectAnio2');

  // Generar opciones excluyendo el año seleccionado en Año 1
  selectAnio2.innerHTML = generarOpcionesAnios(true, anio1);
}

let chartEvolucion; // Variable global para el gráfico

function dibujarGraficoEvolucion() {
  const anio1 = document.getElementById('selectAnio1').value;
  const anio2 = document.getElementById('selectAnio2').value;

  if (!anio1 || anio1 === anio2) return; // No continuar si los años son iguales o si Año 1 no está seleccionado

  document.getElementById('loadingSpinner').style.display = 'block'; // Mostrar spinner

  fetch(`../../app/controlador/Reporte/api_evolucion_mensual.php?anio1=${anio1}&anio2=${anio2}`)
      .then(response => response.json())
      .then(data => {
          document.getElementById('loadingSpinner').style.display = 'none'; // Ocultar spinner

          const ctx = document.getElementById('graficoEvolucionMensual').getContext('2d');
          if (chartEvolucion) {
              chartEvolucion.destroy();
          }

          const datasets = [];

          if (data.anio1) {
              datasets.push({
                  label: `${anio1}`,
                  data: data.anio1.map(item => item.cantidad),
                  borderColor: 'rgba(54, 162, 235, 1)',
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  fill: true,
                  tension: 0.3,
                  pointRadius: 5
              });
          }

          if (data.anio2) {
              datasets.push({
                  label: `${anio2}`,
                  data: data.anio2.map(item => item.cantidad),
                  borderColor: 'rgba(255, 99, 132, 1)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  fill: true,
                  tension: 0.3,
                  pointRadius: 5
              });
          }

          chartEvolucion = new Chart(ctx, {
              type: 'line',
              data: {
                  labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
                  datasets: datasets
              },
              options: {
                  responsive: true,
                  plugins: {
                      legend: {
                          position: 'top',
                          labels: {
                              font: {
                                  size: 14
                              }
                          }
                      },
                      tooltip: {
                          mode: 'index',
                          intersect: false,
                          callbacks: {
                              label: function(context) {
                                  const cantidad = context.raw;
                                  const textoCurso = cantidad === 1 ? 'curso' : 'cursos';
                                  return `${cantidad} ${textoCurso}`;
                              }
                          }
                      }
                  },
                  interaction: {
                      mode: 'nearest',
                      axis: 'x',
                      intersect: false
                  },
                  scales: {
                      y: {
                          beginAtZero: true,
                          ticks: {
                              stepSize: 1
                          }
                      }
                  }
              }
          });
      })
      .catch(error => {
          console.error('Error:', error);
          document.getElementById('loadingSpinner').style.display = 'none';
          alert('Error cargando el gráfico.');
      });
}

function descargarGrafico() {
  const enlace = document.createElement('a');
  enlace.href = chartEvolucion.toBase64Image();
  enlace.download = 'evolucion_mensual_cursos.png';
  enlace.click();
}

  
  
  
function cargarParticipantesGenero() {
  reportContainer.innerHTML = `
    <h3 class="fw-bold mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#212529" class="bi bi-people-fill" viewBox="0 0 16 16">
  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
</svg> Participantes por Género y Curso</h3>
    <div class="position-relative">
      <canvas id="graficoGenero" height="250"></canvas>
      <div id="loadingSpinnerGenero" class="text-center position-absolute top-50 start-50 translate-middle" style="display:none;">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>
    </div>
    <div class="mt-4 text-center">
      <a target="_blank" href="../../app/controlador/fpdf/Reporte/ReporteParticipantesGenero.php" class="btn btn-danger btn-lg">
        Descargar Reporte PDF
      </a>
    </div>
  `;

  document.getElementById('loadingSpinnerGenero').style.display = 'block';

  fetch('../../app/controlador/Reporte/api_participantes_genero.php')
    .then(response => response.json())
    .then(data => {
      document.getElementById('loadingSpinnerGenero').style.display = 'none';

      if (data && data.length > 0) {
        const cursos = [...new Set(data.map(item => item.curso))];
        const generos = [...new Set(data.map(item => item.genero))];

        const backgroundColors = {
          'Masculino': 'rgba(54, 162, 235, 0.6)',
          'Femenino': 'rgba(255, 99, 132, 0.6)',
          'Otro': 'rgba(255, 205, 86, 0.6)'
        };

        const datasets = generos.map(genero => ({
          label: genero,
          backgroundColor: backgroundColors[genero] || 'rgba(201, 203, 207, 0.6)',
          borderColor: backgroundColors[genero] ? backgroundColors[genero].replace('0.6', '1') : 'rgba(0, 0, 0, 0.2)',
          borderWidth: 1,
          barThickness: 30,
          data: cursos.map(curso => {
            const found = data.find(d => d.curso === curso && d.genero === genero);
            return found ? found.cantidad : 0;
          })
        }));

        const ctx = document.getElementById('graficoGenero').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: cursos,
            datasets: datasets
          },
          options: {
            responsive: true,
            plugins: {
              tooltip: { mode: 'index', intersect: false },
              legend: {
                position: 'bottom',
                labels: { font: { size: 12 } }
              }
            },
            scales: {
              x: {
                beginAtZero: true,
                stacked: false,
                ticks: { font: { size: 10 } },
                grid: { display: false }
              },
              y: {
                stacked: false,
                ticks: { font: { size: 12 } },
                grid: { color: 'rgba(0, 0, 0, 0.05)' }
              }
            },
            categoryPercentage: 0.5,
            barPercentage: 0.8
          }
        });

        // Scroll automático
        setTimeout(() => {
          const grafico = document.getElementById('graficoGenero');
          if (grafico) {
            grafico.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);

      } else {
        reportContainer.innerHTML = `<div class="text-warning text-center">No hay datos disponibles.</div>`;
      }
    })
    .catch(error => {
      document.getElementById('loadingSpinnerGenero').style.display = 'none';
      console.error('Error:', error);
      reportContainer.innerHTML = `<div class="text-danger text-center">Error cargando el reporte.</div>`;
    });
}


  
  
let graficoOcupacion = null;
let graficoSolicitados = null;
let cursosData = []; // Almacenará los datos de los cursos para la tabla

function cargarOcupacionCursos() {
  reportContainer.innerHTML = `
    <h3 class="fw-bold mb-4 text-center">Ocupación de Cursos</h3>
    <div class="filter-container mb-4">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <label><strong>Filtrar cursos:</strong></label>
          <select id="cursosSelect" class="form-select" multiple style="height: auto; min-height: 120px;">
            <!-- Opciones se llenarán dinámicamente -->
          </select>
          <div class="mt-2">
            <button id="selectAllCursos" class="btn btn-sm btn-outline-primary me-2">Seleccionar todo</button>
            <button id="deselectAllCursos" class="btn btn-sm btn-outline-secondary">Deseleccionar todo</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-md-6 mb-4">
        <div class="card shadow-sm p-3">
          <h5 class="text-center">Ocupación de Cursos</h5>
          <canvas id="graficoOcupacionCursos" height="400"></canvas>
        </div>
      </div>

      <div class="col-md-6 mb-4">
        <div class="card shadow-sm p-3">
          <h5 class="text-center">Cursos Más Solicitados</h5>
          <canvas id="graficoCursosSolicitados" height="400"></canvas>
        </div>
      </div>
    </div>

    <div class="card shadow-sm mt-4">
      <div class="card-header bg-primary text-white">
        <h5 class="card-title mb-0">Resumen de Cursos</h5>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table id="tablaCursos" class="table table-striped table-hover table-bordered">
            <thead class="table-dark">
              <tr>
                <th class="cursor-pointer" onclick="ordenarTabla('nombre')">
                  Curso 
                  <span class="sort-icon">${getSortIconSVG()}</span>
                </th>
                <th class="cursor-pointer" onclick="ordenarTabla('inscritos')">
                  Inscritos 
                  <span class="sort-icon">${getSortIconSVG()}</span>
                </th>
                <th class="cursor-pointer" onclick="ordenarTabla('cupos')">
                  Cupos Disponibles 
                  <span class="sort-icon">${getSortIconSVG()}</span>
                </th>
                <th class="cursor-pointer" onclick="ordenarTabla('ocupacion')">
                  Ocupación (%) 
                  <span class="sort-icon">${getSortIconSVG()}</span>
                </th>
              </tr>
            </thead>
            <tbody id="tablaCursosBody">
              <!-- Datos se llenarán dinámicamente -->
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="mt-4 text-center">
      <form id="formReporte" target="_blank" action="../../app/controlador/fpdf/Reporte/ReporteOcupacionCurso.php" method="POST">
        <input type="hidden" name="cursosSeleccionados" id="cursosSeleccionadosInput">
        <button type="submit" class="btn btn-danger btn-lg">
          <i class="fas fa-file-pdf me-2"></i>Descargar Reporte PDF
        </button>
      </form>
    </div>
  `;

  cargarGraficoOcupacion();
  cargarCursosSolicitados();

  // Scroll hacia el gráfico después de un breve retraso
  setTimeout(() => {
    const grafico = document.getElementById('graficoOcupacionCursos');
    if (grafico) {
      grafico.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 100);
}

// Función para generar iconos SVG
function getSortIconSVG() {
  return `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 3l5 5-5 5"/>
      <path d="M22 8H2"/>
      <path d="M7 21l-5-5 5-5"/>
      <path d="M2 16h20"/>
    </svg>
  `;
}

function getCheckIconSVG() {
  return `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  `;
}

function getTimesIconSVG() {
  return `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 6L6 18"/>
      <path d="M6 6l12 12"/>
    </svg>
  `;
}

function cargarGraficoOcupacion() {
  fetch('../../app/controlador/Reporte/api_ocupacion_cursos.php')
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const labels = data.map(item => item.nombre_curso);
        const ocupaciones = data.map(item => item.ocupacion);
        const backgroundColors = ocupaciones.map(() => {
          const r = Math.floor(Math.random() * 256);
          const g = Math.floor(Math.random() * 256);
          const b = Math.floor(Math.random() * 256);
          return `rgba(${r}, ${g}, ${b}, 0.7)`;
        });

        const ctx = document.getElementById('graficoOcupacionCursos').getContext('2d');

        if (graficoOcupacion) {
          graficoOcupacion.destroy();
        }

        graficoOcupacion = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Ocupación (%)',
              data: ocupaciones,
              backgroundColor: backgroundColors,
              borderRadius: 5,
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                title: {
                  display: true,
                  text: 'Porcentaje de ocupación'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Cursos'
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: context => context.parsed.y.toFixed(2) + '%'
                }
              },
              legend: {
                display: false
              }
            }
          }
        });

        configurarFiltros(graficoOcupacion, labels, ocupaciones, backgroundColors);
      } else {
        reportContainer.innerHTML = `<div class="text-warning text-center">No hay datos disponibles para mostrar.</div>`;
      }
    })
    .catch(error => {
      console.error('Error al cargar el reporte:', error);
      reportContainer.innerHTML = `<div class="text-danger text-center">Error al cargar el gráfico.</div>`;
    });
}

function cargarCursosSolicitados() {
  fetch('../../app/controlador/Reporte/api_cursos_solicitados.php')
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const labels = data.map(item => item.nombre_curso);
        const valores = data.map(item => item.total_inscritos);

        const backgroundColors = valores.map(() => {
          const r = Math.floor(Math.random() * 256);
          const g = Math.floor(Math.random() * 256);
          const b = Math.floor(Math.random() * 256);
          return `rgba(${r}, ${g}, ${b}, 0.7)`;
        });

        const ctx = document.getElementById('graficoCursosSolicitados').getContext('2d');

        if (graficoSolicitados) {
          graficoSolicitados.destroy();
        }

        graficoSolicitados = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Estudiantes inscritos',
              data: valores,
              backgroundColor: backgroundColors,
              borderRadius: 5,
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: context => `${context.parsed.y} inscritos`
                }
              }
            },
            scales: {
              x: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Cursos'
                }
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Cantidad de estudiantes'
                }
              }
            }
          }
        });

        // Cargar datos adicionales para la tabla
        cargarDatosParaTabla();
      } else {
        const contenedor = document.getElementById('graficoCursosSolicitados').parentNode;
        contenedor.innerHTML = `<div class="text-warning text-center">No hay datos disponibles para mostrar.</div>`;
      }
    })
    .catch(error => {
      console.error('Error al cargar los cursos solicitados:', error);
      const contenedor = document.getElementById('graficoCursosSolicitados').parentNode;
      contenedor.innerHTML = `<div class="text-danger text-center">Error al cargar el gráfico.</div>`;
    });
}

function cargarDatosParaTabla() {
  fetch('../../app/controlador/Reporte/api_cursos_completos.php')
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo cargar los datos completos de los cursos');
      }
      return response.json();
    })
    .then(data => {
      cursosData = data;
      actualizarTablaCursos();
    })
    .catch(error => {
      console.error('Error al cargar datos para la tabla:', error);
      // Intentar obtener los datos de las otras APIs si falla
      Promise.all([
        fetch('../../app/controlador/Reporte/api_cursos_solicitados.php').then(res => res.json()),
        fetch('../../app/controlador/Reporte/api_ocupacion_cursos.php').then(res => res.json())
      ])
      .then(([solicitadosData, ocupacionData]) => {
        prepararDatosParaTabla(solicitadosData, ocupacionData);
      })
      .catch(err => {
        console.error('Error al cargar datos alternativos:', err);
        document.getElementById('tablaCursosBody').innerHTML = `
          <tr>
            <td colspan="4" class="text-danger text-center">Error al cargar los datos de los cursos</td>
          </tr>
        `;
      });
    });
}

function prepararDatosParaTabla(solicitadosData, ocupacionData) {
  // Crear un mapa de ocupación para búsqueda rápida
  const ocupacionMap = {};
  ocupacionData.forEach(item => {
    ocupacionMap[item.nombre_curso] = item.ocupacion;
  });

  // Preparar datos combinados para la tabla
  cursosData = solicitadosData.map(curso => {
    // Buscar el curso correspondiente en los datos de ocupación
    const cursoOcupacion = ocupacionData.find(c => c.nombre_curso === curso.nombre_curso);
    
    // Calcular max_participantes basado en la ocupación (cálculo original)
    let max_participantes = 0;
    if (cursoOcupacion && cursoOcupacion.ocupacion > 0) {
      max_participantes = Math.round((curso.total_inscritos * 100) / cursoOcupacion.ocupacion);
    }

    return {
      nombre_curso: curso.nombre_curso,
      num_inscritos: curso.total_inscritos,
      max_participantes: max_participantes,
      ocupacion: cursoOcupacion ? cursoOcupacion.ocupacion : 0
    };
  });

  actualizarTablaCursos();
}

function actualizarTablaCursos() {
  const tbody = document.getElementById('tablaCursosBody');
  tbody.innerHTML = '';

  if (cursosData.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="text-warning text-center">No hay datos disponibles para mostrar</td>
      </tr>
    `;
    return;
  }

  cursosData.forEach(curso => {
    const cuposDisponibles = curso.max_participantes - curso.num_inscritos;
    const porcentajeOcupacion = ((curso.num_inscritos / curso.max_participantes) * 100).toFixed(2);
    
    // Determinar clase CSS para cupos disponibles
    const cuposClass = cuposDisponibles > 0 ? 'text-success fw-bold' : 'text-danger fw-bold';
    const icono = cuposDisponibles > 0 ? getCheckIconSVG() : getTimesIconSVG();
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${curso.nombre_curso}</td>
      <td>${curso.num_inscritos}</td>
      <td class="${cuposClass}">
        <span class="d-flex align-items-center gap-1">
          ${icono}
          ${Math.max(0, cuposDisponibles)}
        </span>
      </td>
      <td>${porcentajeOcupacion}%</td>
    `;
    tbody.appendChild(row);
  });
}

let ordenActual = { columna: null, direccion: 'asc' };

function ordenarTabla(columna) {
  // Cambiar dirección si es la misma columna
  if (ordenActual.columna === columna) {
    ordenActual.direccion = ordenActual.direccion === 'asc' ? 'desc' : 'asc';
  } else {
    ordenActual.columna = columna;
    ordenActual.direccion = 'asc';
  }

  // Ordenar los datos
  cursosData.sort((a, b) => {
    let valorA, valorB;
    
    switch(columna) {
      case 'nombre':
        valorA = a.nombre_curso.toLowerCase();
        valorB = b.nombre_curso.toLowerCase();
        break;
      case 'inscritos':
        valorA = a.num_inscritos;
        valorB = b.num_inscritos;
        break;
      case 'cupos':
        valorA = a.max_participantes - a.num_inscritos;
        valorB = b.max_participantes - b.num_inscritos;
        break;
      case 'ocupacion':
        valorA = (a.num_inscritos / a.max_participantes) * 100;
        valorB = (b.num_inscritos / b.max_participantes) * 100;
        break;
      default:
        return 0;
    }
    
    if (valorA < valorB) {
      return ordenActual.direccion === 'asc' ? -1 : 1;
    }
    if (valorA > valorB) {
      return ordenActual.direccion === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Actualizar la tabla
  actualizarTablaCursos();
  
  // Actualizar iconos de ordenamiento
  actualizarIconosOrden(columna);
}

function actualizarIconosOrden(columnaActual) {
  const headers = document.querySelectorAll('#tablaCursos th');
  headers.forEach(header => {
    const icon = header.querySelector('.sort-icon');
    if (icon) {
      if (header.textContent.trim().includes(columnaActual)) {
        icon.innerHTML = ordenActual.direccion === 'asc' ? `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        ` : `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        `;
      } else {
        icon.innerHTML = getSortIconSVG();
      }
    }
  });
}

function configurarFiltros(grafico, labels, ocupaciones, backgroundColors) {
  const select = document.getElementById('cursosSelect');
  
  // Llenar el select múltiple
  labels.forEach((label, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = label;
    option.selected = true;
    select.appendChild(option);
  });

  const updateChart = () => {
    const selectedIndices = Array.from(select.selectedOptions).map(option => parseInt(option.value));
    
    const filteredLabels = selectedIndices.map(index => labels[index]);
    const filteredOcupaciones = selectedIndices.map(index => ocupaciones[index]);
    const filteredColors = selectedIndices.map(index => backgroundColors[index]);

    grafico.data.labels = filteredLabels;
    grafico.data.datasets[0].data = filteredOcupaciones;
    grafico.data.datasets[0].backgroundColor = filteredColors;
    grafico.update();

    document.getElementById('cursosSeleccionadosInput').value = JSON.stringify(filteredLabels);
  };

  // Botones para seleccionar/deseleccionar todo
  document.getElementById('selectAllCursos').addEventListener('click', () => {
    Array.from(select.options).forEach(option => option.selected = true);
    updateChart();
  });

  document.getElementById('deselectAllCursos').addEventListener('click', () => {
    Array.from(select.options).forEach(option => option.selected = false);
    updateChart();
  });

  // Evento para cambios en el select
  select.addEventListener('change', updateChart);

  updateChart();
}


let chartInstance = null; // Guardamos la instancia del gráfico

function cargarRendimientoAcademico() {
  reportContainer.innerHTML = `
    <h3 class="fw-bold mb-4" id="tituloRendimiento">Rendimiento Académico (Actual)</h3>
    <div style="display: flex; justify-content: flex-end; align-items: center;">
      <label for="historicosCheckbox" style="font-size: 1.2rem; margin-right: 10px;">Registros Históricos</label>
      <input type="checkbox" id="historicosCheckbox" onchange="actualizarGrafico()" style="transform: scale(1.5); accent-color: #007bff;" />
    </div>
    <canvas id="graficoRendimiento"></canvas>
  `;

  // Cargar los datos y actualizar la gráfica
  actualizarGrafico();

  // Hacer scroll hacia el gráfico después de un pequeño retraso
  setTimeout(() => {
    const canvas = document.getElementById("graficoRendimiento");
    if (canvas) {
      canvas.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 100); // Ajusta el retraso si es necesario
}

  
  function actualizarGrafico() {
    // Verificar si el checkbox está marcado
    const incluirHistoricos = document.getElementById('historicosCheckbox').checked;
    
    // Actualizar el título dependiendo del checkbox
    const titulo = document.getElementById('tituloRendimiento');
    if (incluirHistoricos) {
      titulo.textContent = "Rendimiento Académico (Histórico)";
    } else {
      titulo.textContent = "Rendimiento Académico (Actual)";
    }
  
    // Si ya existe un gráfico, destruirlo antes de crear uno nuevo
    if (chartInstance) {
      chartInstance.destroy();
    }
  
    fetch('../../app/controlador/Reporte/api_rendimiento_academico.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        incluirHistoricos: incluirHistoricos
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const cursos = data.map(curso => curso.nombre_curso);
        const aprobados = data.map(curso => curso.aprobados);
        const reprobados = data.map(curso => curso.reprobados);
        const ausentes = data.map(curso => curso.ausentes);
  
        const ctx = document.getElementById('graficoRendimiento').getContext('2d');
        chartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: cursos,
            datasets: [
              {
                label: 'Aprobados',
                data: aprobados,
                backgroundColor: '#28a745' // Verde
              },
              {
                label: 'Reprobados',
                data: reprobados,
                backgroundColor: '#dc3545' // Rojo
              },
              {
                label: 'Ausentes',
                data: ausentes,
                backgroundColor: '#ffc107' // Amarillo
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      } else {
        reportContainer.innerHTML = `<div class="text-warning text-center">No hay datos suficientes para mostrar.</div>`;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      reportContainer.innerHTML = `<div class="text-danger text-center">Error cargando datos.</div>`;
    });
  }
  


function cargarGenerarConstancias() {
    reportContainer.innerHTML = `
        <h3 class="fw-bold mb-4 text-center">Generar Constancias de Participantes</h3>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card shadow-sm p-4" id="constanciasContainer">
                    <div class="mb-3">
                        <label for="cedulaParticipante" class="form-label">Cédula del Participante</label>
                        <input type="number" class="form-control" id="cedulaParticipante" placeholder="Ingrese la cédula">
                    </div>
                    <div class="text-center">
                        <button id="buscarParticipante" class="btn btn-primary">Buscar Participante</button>
                    </div>
                    <div id="resultadoBusqueda" class="mt-3"></div>
                </div>
            </div>
        </div>
    `;

    // Desplazamiento suave hacia el formulario
    setTimeout(() => {
        const element = document.getElementById('constanciasContainer');
        if (element) {
            const offset = 100; // Ajusta este valor según necesites
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }, 100);

    document.getElementById('buscarParticipante').addEventListener('click', buscarParticipante);
}

function buscarParticipante() {
    const cedula = document.getElementById('cedulaParticipante').value;
    const resultadoDiv = document.getElementById('resultadoBusqueda');
    
    if (!cedula) {
        resultadoDiv.innerHTML = `
            <div class="alert alert-warning">
                Por favor ingrese una cédula válida
            </div>
        `;
        return;
    }

    resultadoDiv.innerHTML = `<div class="text-center"><div class="spinner-border text-primary" role="status"></div></div>`;

    fetch(`../../app/controlador/Reporte/api_buscar_participante.php?cedula=${cedula}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                resultadoDiv.innerHTML = `
                    <div class="alert alert-danger">
                        ${data.error}
                    </div>
                `;
            } else {
                resultadoDiv.innerHTML = `
                    <div class="alert alert-success">
                        <h5>Participante encontrado:</h5>
                        <p><strong>Nombre:</strong> ${data.nombre} ${data.apellido}</p>
                        <p><strong>Cédula:</strong> ${data.cedula}</p>
                        <p><strong>Estado:</strong> ${data.estado}</p>
                        <div class="text-center mt-3">
                            <a href="http://localhost/Sistema%20de%20Control%20de%20Participantes/app/controlador/fpdf/constanciaParticipante.php?id=${data.id_participante}" 
                               class="btn btn-success" target="_blank">
                                Generar Constancia
                            </a>
                        </div>
                    </div>
                `;
            }
        })
        .catch(error => {
            resultadoDiv.innerHTML = `
                <div class="alert alert-danger">
                    Error al buscar el participante: ${error.message}
                </div>
            `;
            console.error('Error:', error);
        });
}

