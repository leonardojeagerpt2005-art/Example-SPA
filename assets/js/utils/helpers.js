/**
 * Helpers reutilizables
 *
 * Este archivo contiene funciones auxiliares que pueden
 * utilizarse en diferentes partes de la aplicación.
 */

/**
 * Carga dinámicamente un archivo HTML.
 *
 * @param {string} path
 * Ruta del archivo HTML que se desea cargar.
 *
 * @returns {Promise<string>}
 * Devuelve el contenido HTML en formato texto.
 */
export async function loadHTML(path) {

    try {

        // Realiza una petición HTTP para obtener el archivo.
        const response = await fetch(path);

        // Verifica si la respuesta fue exitosa.
        if (!response.ok) {

            // Si ocurre un error (404, 500, etc.),
            // lanza una excepción.
            throw new Error(
                `Error cargando HTML: ${path}`
            );
        }

        // Convierte el contenido del archivo en texto.
        return await response.text();

    } catch (error) {

        // Muestra el error en consola.
        console.error(error);

        // Devuelve un mensaje HTML de error.
        return '<h2>Error cargando contenido</h2>';
    }
}