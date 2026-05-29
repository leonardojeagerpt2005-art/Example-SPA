/**
 * Router SPA
 *
 * Este archivo se encarga de controlar la navegación
 * dentro de la aplicación sin necesidad de recargar
 * la página completa.
 */

// Importa la función que renderiza la página principal.
import { renderHome } from './pages/home.js';

// Importa la función que renderiza la página de contactos.
import { renderContacts } from './pages/contacts.js';

// Importa la función que renderiza la página acerca de.
import { renderAbout } from './pages/about.js';

// Importa la función que renderiza la página de episodios.
import { renderEpisode } from './pages/episodes.js';

// Importa la función que renderiza la página de locaciones.
import { renderLocation } from './pages/locations.js';

/**
 * Objeto que almacena todas las rutas disponibles.
 *
 * La clave representa la URL.
 * El valor representa la función que renderiza la vista.
 */
const routes = {

    // Página principal.
    '/': renderHome,

    // Página de episodios.
    '/episodes': renderEpisode,

    // Página de locaciones.
    '/locations': renderLocation,

    // Página de contactos.
    '/contacts': renderContacts,

    // Página acerca de.
    '/about': renderAbout
};

/**
 * Router principal.
 *
 * Detecta la URL actual y carga la vista correspondiente.
 */
export async function router() {

    // Obtiene la ruta actual desde la barra de direcciones.
    const path = window.location.pathname;

    // Busca si existe una función asociada a esa ruta.
    const render = routes[path];

    // Si la ruta existe.
    if (render) {

        // Ejecuta la función de renderizado.
        await render();

    } else {

        // Si la ruta no existe,
        // muestra una página de error 404.
        document.getElementById('content').innerHTML = `
            <section>
                <h2>404 - Página no encontrada</h2>
            </section>
        `;
    }
}