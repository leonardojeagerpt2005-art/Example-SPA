// assets/js/components/characterCard.js

/**
 * Función que recibe un objeto character
 * y devuelve una plantilla HTML (template string)
 * para mostrar una tarjeta de personaje.
 */
export function characterCard(character) {
    return `
        <!-- Contenedor principal de la tarjeta -->
        <div class="card">

            <!-- Imagen del personaje -->
            <img src="${character.image}" alt="${character.name}">

            <!-- Cuerpo de la tarjeta -->
            <div class="card-body">

                <!-- Nombre del personaje -->
                <h3 class="card-title">${character.name}</h3>

                <!-- Estado del personaje (Alive, Dead, Unknown) -->
                <p class="card-text">
                    <strong>Status:</strong> ${character.status}
                </p>

                <!-- Especie del personaje -->
                <p class="card-text">
                    <strong>Species:</strong> ${character.species}
                </p>
                
                <!-- Contenedor de los botones -->
                <div style="margin-top: 15px; display: flex; gap: 10px;">

                    <!-- Botón Editar -->
                    <button
                        class="btn-edit"

                        /* Atributos data-* para guardar información
                           del personaje dentro del botón */
                        data-id="${character.id}"
                        data-name="${character.name}"
                        data-species="${character.species}"
                        data-gender="${character.gender || 'unknown'}"
                        data-status="${character.status}"
                        data-image="${character.image}"

                        /* Estilos inline */
                        style="
                            background-color: #007bff;
                            color: white;
                            border: none;
                            padding: 10px;
                            border-radius: 6px;
                            cursor: pointer;
                            flex: 1;
                            font-weight: bold;
                            font-size: 0.9rem;
                        "
                    >
                        Editar
                    </button>
                    
                    <!-- Botón Eliminar -->
                    <button
                        class="btn-delete"

                        /* Guarda únicamente el id para saber
                           qué personaje eliminar */
                        data-id="${character.id}"

                        /* Estilos inline */
                        style="
                            background-color: #dc3545;
                            color: white;
                            border: none;
                            padding: 10px;
                            border-radius: 6px;
                            cursor: pointer;
                            flex: 1;
                            font-weight: bold;
                            font-size: 0.9rem;
                        "
                    >
                        Borrar
                    </button>

                </div>
            </div>
        </div>
    `;
}