//Función para activar la barra de busqueda
function buscarParticipantes() {
    const input = document.getElementById('searchInput');
    const filtro = input.value.toLowerCase();
    const filas = document.querySelectorAll('#tabla-participantes tbody tr');

    filas.forEach(fila => {
        const texto = fila.textContent.toLowerCase();
        fila.style.display = texto.includes(filtro) ? '' : 'none';
    });
}