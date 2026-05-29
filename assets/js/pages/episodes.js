// Importa la instancia de httpClient.
// Este cliente se utiliza para realizar peticiones HTTP a la API.
import httpClient from "../services/httpClient"; 

/**
 * Función encargada de renderizar la vista de episodios.
 * Obtiene los datos desde la API de Rick and Morty
 * y genera dinámicamente las tarjetas de cada episodio.
 */
export async function renderEpisode(){

    // Obtiene el contenedor principal donde se mostrará la vista.
    const content = document.getElementById('content');

    // Inserta una estructura inicial mientras se cargan los datos.
    content.innerHTML = `
    <section class="container mt-4">

        <!-- Título principal -->
        <h2 class="text-center text-success mb-4"
            style="font-weight: 700; font-size: 2.2rem;">
            Línea de Tiempo de Episodios
        </h2>

        <!-- Contenedor donde se mostrarán los episodios -->
        <div id="episodes-list" class="row">
            Cargando portales interdimensionales...
        </div>

    </section>
    `;

    try {

        // Realiza una petición GET a la ruta /episode
        const response = await httpClient.get('/episode');

        // Obtiene el arreglo de episodios desde la respuesta
        const episodes = response.data.results;

        // Obtiene el contenedor donde se insertarán las tarjetas
        const listContainer = document.getElementById('episodes-list');

        // Recorre todos los episodios usando map()
        // y genera una tarjeta HTML para cada uno.
        listContainer.innerHTML = episodes.map(ep => `

        <!-- Columna Bootstrap -->
        <div class="col-md-1 mb-4">

            <!-- Tarjeta del episodio -->
            <div class="card bg-dark text-white shadow-sm h-100"
                style="
                    border: none;
                    border-left: 5px solid #198754;
                    border-radius: 10px;
                    background-color: #1a1d20 !important;
                ">

                <div class="card-body d-flex flex-column justify-content-between"
                    style="padding: 1.25rem;">

                    <!-- Información principal -->
                    <div>

                        <!-- Código del episodio -->
                        <span style="
                            font-size: 0.8rem;
                            color: #6c757d;
                            font-weight: bold;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                        ">
                            ${ep.episode}
                        </span>

                        <!-- Nombre del episodio -->
                        <h5 class="card-title text-warning mt-1 mb-3"
                            style="
                                font-size: 1.2rem;
                                font-weight: 600;
                            ">
                            ${ep.name}
                        </h5>

                        <!-- Fecha de emisión -->
                        <p class="card-text mb-3"
                            style="
                                font-size: 0.95rem;
                                color: #e0e0e0;
                        ">
                            <strong> Emisión:</strong>
                            ${ep.air_date}
                        </p>

                    </div>

                    <!-- Cantidad de personajes -->
                    <div class="mt-2">

                        <span class="badge bg-success"
                            style="
                                padding: 8px 12px;
                                font-size: 0.85rem;
                                font-weight: bold;
                                border-radius: 6px;
                                background-color: #198754 !important;
                            ">

                            ${ep.characters.length}
                            Personajes participantes

                        </span>

                    </div>

                </div>
            </div>
        </div>

        `).join(''); // Une todos los elementos del array en un único string HTML

    } catch (error) {

        // Si ocurre un error en la petición,
        // se muestra en la consola.
        console.error("Error cargando episodes:", error)

        // Muestra un mensaje de error al usuario.
        document.getElementById('episodes-list').innerHTML = `
            <div class="col-12 alert alert-danger text-center">
                Error al conectar con la api de Rick And Morty.
                Inténtalo más tarde.
            </div>
        `;
    }
}