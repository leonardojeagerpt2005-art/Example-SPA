// Importa la función loadHTML desde el archivo helpers.js
// Esta función se encarga de cargar un archivo HTML y devolver su contenido.
import { loadHTML } from '../utils/helpers.js';

/**
 * Función encargada de renderizar la vista "About".
 * Es asíncrona porque necesita esperar la carga del archivo HTML.
 */
export async function renderAbout() {

    // Busca en el DOM el elemento con id="content"
    // Este será el contenedor donde se mostrará la vista About.
    const content = document.getElementById('content');

    // Carga el archivo about.html usando loadHTML()
    // await pausa la ejecución hasta que el archivo sea cargado.
    // Luego inserta el HTML obtenido dentro del contenedor.
    content.innerHTML = await loadHTML(
        './assets/js/views/about.html'
    );
}