// assets/js/services/characterService.js

// Importa la función que obtiene los personajes desde la API.
import { getCharacters as getApiCharacters } from "./api.js";

// Clave donde se almacenan los personajes creados o editados.
const LOCAL_STORAGE_KEY = 'custom_characters';

// Clave donde se almacenan los IDs de personajes originales
// de la API que han sido eliminados de forma lógica.
const DELETED_API_KEY = 'deleted_api_characters';

/**
 * Obtiene todos los personajes del sistema.
 *
 * Combina:
 * 1. Personajes originales de la API.
 * 2. Personajes creados localmente.
 * 3. Personajes originales que fueron editados.
 *
 * También excluye los personajes eliminados.
 *
 * @returns {Promise<Array>}
 */
export async function getAllCharacters() {

    try {

        // Obtiene personajes originales desde la API.
        const apiCharacters =
            await getApiCharacters();

        // Obtiene la lista de IDs eliminados.
        const deletedApiIds =
            JSON.parse(
                localStorage.getItem(DELETED_API_KEY)
            ) || [];

        // Obtiene personajes creados o editados localmente.
        const localCharacters =
            JSON.parse(
                localStorage.getItem(LOCAL_STORAGE_KEY)
            ) || [];

        // Extrae los IDs de personajes editados.
        const editedApiIds =
            localCharacters.map(
                char => String(char.id)
            );

        // Filtra los personajes originales.
        const activeApiCharacters =
            apiCharacters.filter(char => {

                const idStr = String(char.id);

                // Conserva únicamente los personajes
                // que no han sido eliminados
                // y que no tienen una versión editada.
                return (
                    !deletedApiIds.includes(idStr) &&
                    !editedApiIds.includes(idStr)
                );
            });

        // Une personajes locales y originales.
        return [
            ...localCharacters,
            ...activeApiCharacters
        ];

    } catch (error) {

        console.error(
            "Error al unificar personajes:",
            error
        );

        return [];
    }
}

/**
 * Guarda o actualiza un personaje.
 *
 * Si no tiene ID:
 * → Crea un personaje nuevo.
 *
 * Si tiene ID:
 * → Actualiza un personaje existente.
 *
 * @param {Object} character
 * @returns {Object}
 */
export function saveLocalCharacter(character) {

    // Obtiene personajes almacenados.
    const localCharacters =
        JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY)
        ) || [];

    // Si no tiene ID significa que es nuevo.
    if (!character.id) {

        // Genera un ID único.
        character.id = `local-${Date.now()}`;

        // Marca el personaje como local.
        character.isLocal = true;

        // Lo agrega al inicio del arreglo.
        localCharacters.unshift(character);

    } else {

        // Convierte el ID a string.
        const idStr = String(character.id);

        // Busca si ya existe.
        const index =
            localCharacters.findIndex(
                char =>
                    String(char.id) === idStr
            );

        // Si ya existe.
        if (index !== -1) {

            // Sobrescribe sus datos.
            localCharacters[index] = character;

        } else {

            // Si no existe, significa que
            // es la primera edición de un personaje API.
            localCharacters.unshift(character);
        }
    }

    // Guarda los cambios en LocalStorage.
    localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(localCharacters)
    );

    return character;
}

/**
 * Elimina personajes del sistema.
 *
 * Si es local:
 * → Se elimina completamente.
 *
 * Si es de la API:
 * → Se guarda su ID en una lista negra.
 *
 * @param {string|number} id
 */
export function deleteCharacterFromSystem(id) {

    // Convierte el ID a string.
    const idStr = String(id);

    // Caso 1:
    // Personaje creado localmente.
    if (idStr.startsWith('local-')) {

        // Obtiene los personajes locales.
        const localCharacters =
            JSON.parse(
                localStorage.getItem(
                    LOCAL_STORAGE_KEY
                )
            ) || [];

        // Elimina el personaje.
        const updated =
            localCharacters.filter(
                char =>
                    String(char.id) !== idStr
            );

        // Guarda el arreglo actualizado.
        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify(updated)
        );

    } else {

        // Caso 2:
        // Personaje original de la API.

        // Obtiene la lista negra.
        const deletedApiIds =
            JSON.parse(
                localStorage.getItem(
                    DELETED_API_KEY
                )
            ) || [];

        // Si aún no está eliminado.
        if (!deletedApiIds.includes(idStr)) {

            // Lo agrega a la lista negra.
            deletedApiIds.push(idStr);

            // Guarda la lista negra.
            localStorage.setItem(
                DELETED_API_KEY,
                JSON.stringify(deletedApiIds)
            );
        }
    }
}