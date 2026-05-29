// assets/js/pages/home.js

// Importa la función que permite cargar archivos HTML dinámicamente.
import { loadHTML } from '../utils/helpers.js';

// Importa la función que genera una tarjeta HTML para cada personaje.
import { characterCard } from '../components/characterCard.js';

// Importa las funciones del servicio de personajes.
import {
    getAllCharacters,          // Obtiene todos los personajes (API + LocalStorage)
    saveLocalCharacter,        // Guarda o actualiza personajes
    deleteCharacterFromSystem  // Elimina personajes
} from '../services/characterService.js';

/**
 * Función principal que renderiza la vista Home.
 */
export async function renderHome() {

    // Obtiene el contenedor principal de la aplicación.
    const content = document.getElementById('content');

    // Carga e inserta el archivo home.html.
    content.innerHTML = await loadHTML(
        './assets/js/views/home.html'
    );

    // Busca el formulario de creación/edición.
    const form = document.getElementById('create-character-form');

    // Si el formulario existe y aún no existe el input oculto para el ID,
    // se crea dinámicamente.
    if (form && !document.getElementById('form-id')) {

        const hiddenIdInput = document.createElement('input');

        hiddenIdInput.type = 'hidden';
        hiddenIdInput.id = 'form-id';
        hiddenIdInput.value = '';

        // Inserta el input oculto al inicio del formulario.
        form.prepend(hiddenIdInput);
    }

    // Inicializa todas las funcionalidades del CRUD.
    initFormToggle();
    initFormSubmit();
    initDeleteButtons();
    initEditButtons();

    // Muestra todos los personajes.
    await displayCharacters();
}

/**
 * Obtiene los personajes y los renderiza en la grilla.
 */
async function displayCharacters() {

    // Obtiene el contenedor donde se mostrarán las tarjetas.
    const container = document.getElementById('characters-container');

    // Si el contenedor no existe, termina la ejecución.
    if (!container) return;

    try {

        // Obtiene todos los personajes.
        const characters = await getAllCharacters();

        // Verifica que exista un arreglo válido.
        if (!characters || !Array.isArray(characters)) {

            container.innerHTML = `
                <p class="text-center text-white">
                    No se encontraron personajes disponibles.
                </p>
            `;

            return;
        }

        // Genera una tarjeta para cada personaje y las inserta en pantalla.
        container.innerHTML = characters
            .map(character => characterCard(character))
            .join('');

    } catch (error) {

        // Muestra errores en consola.
        console.error(
            "Error renderizando la home:",
            error
        );

        // Muestra mensaje de error al usuario.
        container.innerHTML = `
            <div class="alert alert-danger text-center m-4">
                Error al cargar personajes.
            </div>
        `;
    }
}

/**
 * Maneja el botón para abrir y cerrar el formulario.
 */
function initFormToggle() {

    // Botón que abre/cierra el formulario.
    const toggleBtn =
        document.getElementById('toggle-form-btn');

    // Contenedor del formulario.
    const formContainer =
        document.getElementById('form-container');

    // Si alguno no existe termina.
    if (!toggleBtn || !formContainer) return;

    // Escucha el clic del botón.
    toggleBtn.addEventListener('click', () => {

        // Si el formulario está oculto.
        if (
            formContainer.style.display === 'none' ||
            formContainer.style.display === ''
        ) {

            // Lo muestra.
            formContainer.style.display = 'block';

            // Cambia texto del botón.
            toggleBtn.textContent =
                'X Cerrar Formulario';

            // Cambia color a rojo.
            toggleBtn.style.backgroundColor =
                '#dc3545';

        } else {

            // Busca el formulario.
            const form =
                document.getElementById(
                    'create-character-form'
                );

            // Limpia todos los campos.
            if (form) form.reset();

            // Limpia el ID oculto.
            const idField =
                document.getElementById('form-id');

            if (idField) {
                idField.value = '';
            }

            // Restablece el título original.
            const title =
                document.querySelector(
                    '.form-subtitle'
                );

            if (title) {
                title.textContent =
                    'Crear Nuevo Personaje Ficticio';
            }

            // Oculta el formulario.
            formContainer.style.display = 'none';

            // Cambia texto del botón.
            toggleBtn.textContent =
                '+ Crear Personaje Ficticio';

            // Cambia color a verde.
            toggleBtn.style.backgroundColor =
                '#28a745';
        }
    });
}

/**
 * Captura los datos del formulario y crea o actualiza personajes.
 */
function initFormSubmit() {

    // Obtiene el formulario.
    const form =
        document.getElementById(
            'create-character-form'
        );

    if (!form) return;

    // Escucha el evento submit.
    form.addEventListener(
        'submit',
        async (event) => {

            // Evita que la página se recargue.
            event.preventDefault();

            // Obtiene el ID oculto.
            const id =
                document.getElementById(
                    'form-id'
                ).value;

            // Obtiene el nombre.
            const name =
                document.getElementById(
                    'form-name'
                ).value.trim();

            // Obtiene la especie.
            const species =
                document.getElementById(
                    'form-species'
                ).value.trim();

            // Obtiene el género.
            const gender =
                document.getElementById(
                    'form-gender'
                ).value;

            // Obtiene el estado.
            const status =
                document.getElementById(
                    'form-status'
                ).value;

            // Obtiene la URL de la imagen.
            const image =
                document.getElementById(
                    'form-image'
                ).value.trim();

            // Verifica que todos los campos estén llenos.
            if (
                !name ||
                !species ||
                !gender ||
                !status ||
                !image
            ) {

                alert(
                    "Por favor, rellena todos los campos obligatorios."
                );

                return;
            }

            // Construye el objeto personaje.
            const characterData = {
                name,
                species,
                gender,
                status,
                image
            };

            // Si existe ID significa que se está editando.
            if (id) {
                characterData.id = id;
            }

            // Guarda o actualiza el personaje.
            saveLocalCharacter(characterData);

            // Mensaje diferente según la acción.
            alert(
                id
                ? "¡Personaje modificado con éxito!"
                : "¡Personaje creado con éxito!"
            );

            // Limpia el formulario.
            form.reset();

            // Limpia el ID oculto.
            document.getElementById(
                'form-id'
            ).value = '';

            // Cierra el formulario.
            document.getElementById(
                'toggle-form-btn'
            ).click();

            // Actualiza la lista.
            await displayCharacters();
        }
    );
}

/**
 * Maneja la eliminación de personajes.
 */
function initDeleteButtons() {

    // Contenedor de las tarjetas.
    const container =
        document.getElementById(
            'characters-container'
        );

    if (!container) return;

    // Delegación de eventos.
    container.addEventListener(
        'click',
        async (event) => {

            // Verifica si se hizo clic en un botón borrar.
            if (
                event.target.classList.contains(
                    'btn-delete'
                )
            ) {

                // Obtiene el ID del personaje.
                const characterId =
                    event.target.getAttribute(
                        'data-id'
                    );

                // Pide confirmación.
                const confirmDelete = confirm(
                    "❌ ¿Estás seguro de que deseas eliminar este personaje?"
                );

                if (confirmDelete) {

                    // Elimina el personaje.
                    deleteCharacterFromSystem(
                        characterId
                    );

                    // Actualiza la lista.
                    await displayCharacters();
                }
            }
        }
    );
}

/**
 * Maneja la edición de personajes.
 */
function initEditButtons() {

    // Contenedor de tarjetas.
    const container =
        document.getElementById(
            'characters-container'
        );

    if (!container) return;

    // Delegación de eventos.
    container.addEventListener(
        'click',
        (event) => {

            // Verifica si se hizo clic en Editar.
            if (
                event.target.classList.contains(
                    'btn-edit'
                )
            ) {

                // Obtiene los datos guardados en los atributos data-*.
                const id =
                    event.target.getAttribute(
                        'data-id'
                    );

                const name =
                    event.target.getAttribute(
                        'data-name'
                    );

                const species =
                    event.target.getAttribute(
                        'data-species'
                    );

                const gender =
                    event.target.getAttribute(
                        'data-gender'
                    );

                const status =
                    event.target.getAttribute(
                        'data-status'
                    );

                const image =
                    event.target.getAttribute(
                        'data-image'
                    );

                // Rellena automáticamente el formulario.
                document.getElementById(
                    'form-id'
                ).value = id;

                document.getElementById(
                    'form-name'
                ).value = name;

                document.getElementById(
                    'form-species'
                ).value = species;

                document.getElementById(
                    'form-gender'
                ).value = gender;

                document.getElementById(
                    'form-status'
                ).value = status;

                document.getElementById(
                    'form-image'
                ).value = image;

                // Cambia el título para indicar edición.
                const title =
                    document.querySelector(
                        '.form-subtitle'
                    );

                if (title) {
                    title.textContent =
                        `Editando a: ${name}`;
                }

                // Si el formulario está cerrado, lo abre.
                const formContainer =
                    document.getElementById(
                        'form-container'
                    );

                if (
                    formContainer.style.display ===
                        'none' ||
                    formContainer.style.display === ''
                ) {

                    document.getElementById(
                        'toggle-form-btn'
                    ).click();
                }

                // Hace scroll hacia arriba suavemente.
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    );
}