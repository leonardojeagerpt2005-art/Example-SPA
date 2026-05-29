/**
 * ---------------------------------------------------------
 * Archivo principal SPA
 * ---------------------------------------------------------
 *
 * Este archivo es el punto de entrada de la aplicación.
 * Se encarga de:
 * - Cargar la barra de navegación.
 * - Ejecutar el router.
 * - Gestionar la navegación sin recargar la página.
 * - Manejar los botones atrás y adelante del navegador.
 */

// Importa la función que carga el navbar.
import { loadNavbar } from './components/navbar.js';

// Importa el router encargado de renderizar las vistas.
import { router } from './router.js';

/**
 * Navega entre rutas sin recargar la página.
 *
 * Utiliza History API para cambiar la URL
 * y luego ejecuta el router.
 *
 * @param {string} url
 * URL de destino.
 */
export function navigateTo(url) {

    // Cambia la URL en el navegador
    // sin recargar la página.
    history.pushState(
        null,
        null,
        url
    );

    // Ejecuta el router para cargar la vista.
    router();
}

/**
 * Inicialización principal de la aplicación.
 *
 * Se ejecuta cuando el HTML ha terminado
 * de cargarse completamente.
 */
window.addEventListener(
    'DOMContentLoaded',
    async () => {

        // Carga el navbar.
        await loadNavbar();

        // Ejecuta el router por primera vez.
        router();

        /**
         * Intercepta los clics en enlaces SPA.
         *
         * Evita la recarga completa de la página
         * y utiliza navegación interna.
         */
        document.body.addEventListener(
            'click',
            event => {

                // Elemento sobre el que se hizo clic.
                const target = event.target;

                // Verifica si tiene el atributo data-link.
                if (
                    target.matches('[data-link]')
                ) {

                    // Evita la navegación tradicional.
                    event.preventDefault();

                    // Navega usando History API.
                    navigateTo(target.href);
                }
            }
        );
    }
);

/**
 * Evento popstate.
 *
 * Se ejecuta cuando el usuario utiliza:
 * - Botón Atrás.
 * - Botón Adelante.
 *
 * De esta forma el router vuelve a renderizar
 * la vista correspondiente.
 */
window.addEventListener(
    'popstate',
    router
);