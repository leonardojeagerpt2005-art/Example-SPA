/**
 * Axios HTTP Client
 *
 * Archivo encargado de centralizar toda la configuración
 * de Axios para realizar peticiones HTTP a la API.
 */

// Importa la librería Axios.
import axios from 'axios';

/**
 * Variables de entorno.
 *
 * import.meta.env es una característica de Vite
 * que permite acceder a variables definidas
 * en el archivo .env.
 */
const API_URL = import.meta.env.VITE_API_URL;
const CONTENT_TYPE = import.meta.env.VITE_CONTENT_TYPE;
const TIME_OUT = import.meta.env.VITE_TIME_OUT;

/**
 * Crea una instancia personalizada de Axios.
 *
 * Todas las peticiones realizadas mediante
 * httpClient utilizarán esta configuración.
 */
const httpClient = axios.create({

    // URL base de la API.
    baseURL: API_URL,

    // Tiempo máximo de espera antes de cancelar la petición.
    timeout: TIME_OUT,

    // Cabeceras por defecto.
    headers: {

        // Tipo de contenido enviado.
        'Content-Type': CONTENT_TYPE
    }
});

/**
 * Interceptor de Peticiones (Request Interceptor)
 *
 * Se ejecuta ANTES de enviar cada petición.
 */
httpClient.interceptors.request.use(

    // Si la configuración es válida.
    config => {

        // Muestra información de la petición en consola.
        console.log(
            `[REQUEST]: ${config.method?.toUpperCase()} ${config.url}`
        );

        // Retorna la configuración para continuar.
        return config;
    },

    // Si ocurre un error antes de enviar la petición.
    error => Promise.reject(error)
);

/**
 * Interceptor de Respuestas (Response Interceptor)
 *
 * Se ejecuta DESPUÉS de recibir una respuesta.
 */
httpClient.interceptors.response.use(

    // Si la respuesta fue exitosa.
    response => response,

    // Si ocurre un error en la respuesta.
    error => {

        // Muestra información del error.
        console.error(
            '[API ERROR]:',
            error.response?.data || error.message
        );

        // Reenvía el error.
        return Promise.reject(error);
    }
);

/**
 * Exporta la instancia configurada.
 *
 * Así puede reutilizarse en cualquier parte
 * de la aplicación.
 */
export default httpClient;