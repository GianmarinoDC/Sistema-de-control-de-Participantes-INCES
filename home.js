// Funcionamiento del menú
const hamburger = document.querySelector("#toggle-btn");
const sidebar = document.querySelector("#sidebar");

// Inicia el menú según el tamaño de la pantalla
function initializeSidebar() {
  const isExpanded = localStorage.getItem("sidebarExpanded") === "true";
  if (window.innerWidth > 768) {
    if (isExpanded) {
      sidebar.classList.add("expand");
    } else {
      sidebar.classList.remove("expand");
    }
  } else {
    sidebar.classList.remove("expand");
  }
}

// Evento para el botón del menu
hamburger.addEventListener("click", function () {
  sidebar.classList.toggle("expand");
  // Guardar el estado actual en localStorage
  const isExpanded = sidebar.classList.contains("expand");
  localStorage.setItem("sidebarExpanded", isExpanded);
});

// Detectar el tamaño de la pantalla
window.addEventListener("resize", initializeSidebar);

// Ejecutar la inicialización al cargar la página
initializeSidebar();

// Quitar la clase 'no-transition' después de cargar la página
window.addEventListener("load", () => {
  document.body.classList.remove("no-transition");
});
