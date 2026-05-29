// Importa el cliente HTTP configurado para realizar
// peticiones a la API de Rick and Morty.
import httpClient from "../services/httpClient"; 

/**
 * Función encargada de renderizar la vista de Locaciones.
 * Obtiene las locaciones desde la API y las muestra
 * en tarjetas utilizando Bootstrap.
 */
export async function renderLocation() {

    // Obtiene el contenedor principal de la aplicación.
    const content = document.getElementById('content');

    // Si el contenedor no existe, termina la función.
    if (!content) return;

    // Inserta una estructura inicial mientras se cargan los datos.
    content.innerHTML = `
    <section class="container mt-4">

        <!-- Título principal -->
        <h2 class="text-center text-info mb-4"
            style="font-weight: 700; font-size: 2.2rem;">
            Registro de Locaciones Multiversales
        </h2>

        <!-- Contenedor donde se mostrarán las locaciones -->
        <div id="locations-list" class="row">
            Escaneando dimensiones...
        </div>

    </section>
    `;

    try {

        // Realiza una petición GET a la ruta /location.
        const response = await httpClient.get('/location');

        // Obtiene el arreglo de locaciones.
        const locations = response.data.results;

        // Obtiene el contenedor donde se insertarán las tarjetas.
        const listContainer =
            document.getElementById('locations-list');

        // Recorre todas las locaciones y genera
        // una tarjeta HTML para cada una.
        listContainer.innerHTML = locations.map(loc => `

        <!-- Columna Bootstrap -->
        <div class="col-md-4 mb-4">

            <!-- Tarjeta -->
            <div class="card bg-dark text-white shadow-sm h-100"
                style="
                    border: none;
                    border-left: 5px solid #0dcaf0;
                    border-radius: 10px;
                    background-color: #1a1d20 !important;
                ">

                <div class="card-body d-flex flex-column justify-content-between"
                    style="padding: 1.25rem;">

                    <!-- Información principal -->
                    <div>

                        <!-- ID de la locación -->
                        <span style="
                            font-size: 0.8rem;
                            color: #6c757d;
                            font-weight: bold;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                        ">
                            ID: #${loc.id}
                        </span>

                        <!-- Nombre de la locación -->
                        <h5 class="card-title text-info mt-1 mb-3"
                            style="
                                font-size: 1.2rem;
                                font-weight: 600;
                            ">
                            ${loc.name}
                        </h5>

                        <!-- Tipo de locación -->
                        <p class="card-text mb-2"
                            style="
                                font-size: 0.95rem;
                                color: #e0e0e0;
                            ">
                            <strong> Tipo:</strong>
                            ${loc.type}
                        </p>

                        <!-- Dimensión -->
                        <p class="card-text mb-3"
                            style="
                                font-size: 0.95rem;
                                color: #e0e0e0;
                            ">
                            <strong> Dimensión:</strong>
                            ${loc.dimension}
                        </p>

                    </div>

                    <!-- Cantidad de residentes -->
                    <div class="mt-2">

                        <span class="badge bg-info text-dark"
                            style="
                                padding: 8px 12px;
                                font-size: 0.85rem;
                                font-weight: bold;
                                border-radius: 6px;
                                background-color: #0dcaf0 !important;
                            ">

                            ${loc.residents.length}
                            Residentes estables

                        </span>

                    </div>

                </div>
            </div>
        </div>

        `).join(''); // Une todas las tarjetas en un único string HTML.

    } catch (error) {

        // Muestra el error en consola.
        console.error(
            "Error cargando locaciones:",
            error
        );

        // Muestra mensaje de error al usuario.
        document.getElementById(
            'locations-list'
        ).innerHTML = `
            <div class="col-12 alert alert-danger text-center">
                Error al mapear las coordenadas dimensionales.
                Inténtalo más tarde.
            </div>
        `;
    }
}