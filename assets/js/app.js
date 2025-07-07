const baseEndpoint = 'https://api.github.com';
const usersEndpoint = `${baseEndpoint}/users`;

//elementos dom
const n = document.querySelector('.name');
const b = document.querySelector('.blog');
const l = document.querySelector('.location'); 


/**  
* @param {string} username 
*/ 
function displayUser(username) {

    if (n) {
        n.textContent = 'cargando...';
    } else {
        console.warn("Elemento con clase 'name' no encontrado en el DOM.");
    }

    return fetch(`${usersEndpoint}/${username}`)
        .then(response => {
            // Verifica si la respuesta de la red fue exitosa 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); 
            // Actualiza el contenido 
            // Se añaden verificaciones para evitar null
            if (n) {
                n.textContent = data.name ?? 'Nombre no disponible';
            }
            if (b) {
                b.textContent = data.blog ? data.blog : 'Blog no disponible';
            }
            // agregué location en mi html e hice la verficación de null
            if (l) {
                l.textContent = data.location ?? 'Ubicación no disponible';
            } else {
                
                console.warn("Elemento con clase 'location' no encontrado");
            }
        });
}

/**
 * 
 * @param {Error} err - El objeto de error.
 */
function handleError(err) {
    console.log('¡error!');
    console.log(err);

    if (n) {
        n.textContent = `Algo salió mal: ${err.message || 'Error'}`;
    } else {
        console.error("el elemento name no esta.");
    }

    if (b) b.textContent = '';
    if (l) l.textContent = ''; 
}

displayUser('stolinski').catch(handleError);