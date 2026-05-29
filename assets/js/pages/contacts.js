// Importa la función loadHTML desde helpers.js
// Esta función se utiliza para cargar archivos HTML dinámicamente.
import { loadHTML } from '../utils/helpers.js';

/**
 * Función que renderiza la vista de Contactos.
 * Es asíncrona porque debe esperar a que se cargue el archivo HTML.
 */
export async function renderContacts() {

    // Obtiene el contenedor principal donde se mostrará la vista.
    const content = document.getElementById('content');

    // Carga el archivo contacts.html e inserta su contenido
    // dentro del contenedor principal.
    content.innerHTML = await loadHTML(
        './assets/js/views/contacts.html'
    );

    // Una vez cargado el HTML, inicializa los eventos del formulario.
    initializeFormEvents();
}

/**
 * Configura los eventos del formulario.
 */
function initializeFormEvents() {

    // Busca el formulario por su id.
    const form = document.getElementById('contact-form');

    // Escucha el evento submit (cuando se envía el formulario)
    // y ejecuta la función handleSubmit.
    form.addEventListener('submit', handleSubmit);
}

/**
 * Maneja el envío del formulario.
 * @param {Event} event - Evento submit generado por el formulario.
 */
function handleSubmit(event) {

    // Evita que la página se recargue al enviar el formulario.
    event.preventDefault();

    // Muestra un mensaje de confirmación.
    alert('Formulario enviado correctamente');
}