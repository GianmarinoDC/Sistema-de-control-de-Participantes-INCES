//Función para activar la barra de busqueda
function buscarCurso() {
    const input = document.getElementById('searchInput');
    const filtro = input.value.toLowerCase();
    const filas = document.querySelectorAll('#tabla-cursos tbody tr');

    filas.forEach(fila => {
        const texto = fila.textContent.toLowerCase();
        fila.style.display = texto.includes(filtro) ? '' : 'none';
    });
}