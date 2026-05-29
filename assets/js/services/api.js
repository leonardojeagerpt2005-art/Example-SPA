/**
 * Servicio encargado de consumir la API de Rick and Morty.
 * Aquí se centralizan todas las peticiones relacionadas
 * con personajes, episodios y locaciones.
 */

// Importa la instancia configurada de httpClient.
import httpClient from './httpClient.js';

/**
 * Obtiene todos los personajes desde la API.
 *
 * @returns {Promise<Array>}
 * Devuelve un arreglo de personajes.
 */
export async function getCharacters() {

    try {

        // Realiza una petición GET a /character.
        const response =
            await httpClient.get('/character');

        // Devuelve únicamente el arreglo de resultados.
        return response.data.results;

    } catch (error) {

        // Muestra el error en consola.
        console.error(error);

        // Devuelve un arreglo vacío para evitar errores.
        return [];
    }
}

/**
 * Obtiene todos los episodios desde la API.
 *
 * @returns {Promise<Array>}
 * Devuelve un arreglo de episodios.
 */
export async function getEpisodes() {

    try {

        // Realiza una petición GET a /episode.
        const response =
            await httpClient.get('/episode');

        // Devuelve el arreglo de episodios.
        return response.data.results;

    } catch (error) {

        // Muestra el error en consola.
        console.error(error);

        // Devuelve un arreglo vacío.
        return [];
    }
}

/**
 * Obtiene todas las locaciones desde la API.
 *
 * @returns {Promise<Array>}
 * Devuelve un arreglo de locaciones.
 */
export async function getLocations() {

    try {

        // Realiza una petición GET a /location.
        const response =
            await httpClient.get('/location');

        // Devuelve el arreglo de locaciones.
        return response.data.results;

    } catch (error) {

        // Muestra el error en consola.
        console.error(error);

        // Devuelve un arreglo vacío.
        return [];
    }
}