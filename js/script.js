// === CONTADOR DE COINS ===

// Obtener el elemento que muestra la cantidad de coins
const contadorCoinsElement = document.getElementById('contador-coins');

// Incrementa las coins en 10 unidades
function incrementarCoins() {
    let coins = parseInt(contadorCoinsElement.textContent);
    coins += 10;
    contadorCoinsElement.textContent = coins;
    console.log("Coins actuales:", coins);
}

// Decrementa las coins en 5 unidades (sin permitir valores negativos)
function decrementarCoins() {
    let coins = parseInt(contadorCoinsElement.textContent);
    if (coins > 0) {
        coins -= 5;
        contadorCoinsElement.textContent = coins;
    }
    console.log("Coins actuales:", coins);
}


// === MENÚ DESPLEGABLE ===

document.addEventListener('DOMContentLoaded', function () {
    const dropdownBtn = document.querySelector('.dropbtn');
    const dropdown = document.querySelector('.dropdown');

    if (dropdownBtn && dropdown) {
        // Mostrar u ocultar el menú al hacer clic en el botón
        dropdownBtn.addEventListener('click', function () {
            dropdown.classList.toggle('show');
        });

        // Cerrar el menú si se hace clic fuera de él
        window.addEventListener('click', function (event) {
            if (!event.target.matches('.dropbtn') && !event.target.closest('.dropdown-content')) {
                if (dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                }
            }
        });
    }
});


// === LÓGICA DEL MAPA DE HEXÁGONOS ===

// Rutas válidas: define qué hexágonos se pueden visitar desde cada uno
const rutasPermitidas = {
    "hex-inicio": ["hex-3-2", "hex-3-4", "hex-2-3", "hex-2-2", "hex-4-3", "hex-4-2"],
    "hex-3-2": ["hex-3-1"],
    "hex-3-4": ["hex-3-5"],
    "hex-2-2": ["hex-1-1"],
    "hex-2-3": ["hex-1-3"],
    "hex-4-2": ["hex-5-1"],
    "hex-4-3": ["hex-5-3"],
    // Agregá más rutas según tu diseño
};

// Guarda la secuencia de hexágonos visitados
let camino = ['hex-inicio'];

// Lista de todos los hexágonos del mapa
const hexagonos = document.querySelectorAll('.hexagon');

// Devuelve los hexágonos permitidos desde el último paso
function getRutaPermitida() {
    const anterior = camino[camino.length - 1];
    return rutasPermitidas[anterior] || [];
}

// Desactiva visualmente los hexágonos que no están en la ruta permitida
function actualizarVista() {
    const permitidos = [...camino, ...getRutaPermitida()];
    hexagonos.forEach(hex => {
        if (!permitidos.includes(hex.id)) {
            hex.classList.add('fall'); // clase que atenúa/desactiva
        }
    });
}

// Muestra la pregunta y oculta el panal con una pequeña demora
function mostrarVistaOculta(vista, panal) {
    setTimeout(() => {
        vista.classList.remove('oculto');
        panal.classList.add('oculto');
    }, 500);
}

function asignarBotonCerrar(boton, vista, panal) {
    if (boton) {
        boton.addEventListener('click', () => {
            vista.classList.add('oculto');
            vista.classList.remove('superpuesto'); // Por si usás esta clase
            panal.classList.remove('oculto');
        });
    }
}


// === EVENTOS PRINCIPALES ===

document.addEventListener('DOMContentLoaded', function () {
    const vistaPregunta = document.querySelector('.container-pregunta');
    const vistaCapsula = document.querySelector('.vista-capsula'); // NUEVO
    const panal = document.querySelector('.panal');
    const botonCerrarInicial = document.querySelector('.cerrar-inicial');
    const botonCerrarPregunta = document.querySelector('.cerrar-pregunta');
    const botonLeido = document.querySelector('.boton-leido')

    hexagonos.forEach(hex => {
        hex.addEventListener('click', () => {
            const id = hex.id;

            // 🐝 Ignorar clic sobre hex-inicio
            if (id === 'hex-inicio') return;

            // 🐝 Verificamos si es un hexágono permitido en la ruta
            if (getRutaPermitida().includes(id)) {

                // ✨ Si es adyacente a hex-inicio, mostramos vista-inicial
                if (rutasPermitidas["hex-inicio"].includes(id) && !hex.classList.contains('usado')) {
                    setTimeout(() => {
                        vistaCapsula.classList.remove('oculto');
                        panal.classList.add('oculto');
                    }, 500);
                    hex.classList.add('usado');
                }

                // 🎯 Si es otro, mostramos la vista de pregunta
                else if (!hex.classList.contains('usado')) {
                    mostrarVistaOculta(vistaPregunta, panal);
                    hex.classList.add('usado');
                }

                hex.classList.add('selected');
                camino.push(id);
                actualizarVista();
            }
        });
    });

    asignarBotonCerrar(botonCerrarInicial,vistaCapsula,panal);
    asignarBotonCerrar(botonLeido,vistaCapsula,panal);
    asignarBotonCerrar(botonCerrarPregunta,vistaPregunta,panal);

});


