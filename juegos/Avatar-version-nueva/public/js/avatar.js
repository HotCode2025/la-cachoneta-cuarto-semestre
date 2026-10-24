import { Personaje } from "./Personaje.js";

// Variables globales del juego
let vidasJugador = 3;
let nombrePersonajeJugador = "";
let personajeEnemigo = null; // Declarada globalmente para el combate

let zuko = new Personaje("Zuko 🔥", "assets/Zuko.ico", "Fuego 🔥");
let katara = new Personaje("Katara 💧", "assets/Katara.ico", "Agua 💧");
let aang = new Personaje("Aang 🌪️", "assets/Aang.ico", "Aire 🌬️");
let toph = new Personaje("Toph 🌱", "assets/Toph.ico", "Tierra 🌍");

const PERSONAJES = [zuko, katara, aang, toph];
const ATAQUES = ["Puño ✊", "Patada 🦶", "Barrida 👣"];

let PERSONAJES_CREADOS = [];
let personajeSeleccionadoPersonalizado = null;

/* REFERENCIAS AL DOM */
const seccionPersonaje = document.getElementById("seleccionar-personaje");
const seccionAtaque = document.getElementById("seleccionar-ataque");
const seccionMensajes = document.getElementById("mensajes");
const seccionReiniciar = document.getElementById("reiniciar");
const seccionReglas = document.getElementById("reglas-juego");

const divPersonajes = document.getElementById("div-personajes");
const pPersonajeSeleccionado = document.getElementById(
  "personaje-seleccionado",
);
const spanPersonajeComputadora = document.getElementById(
  "personaje-computadora",
);
const textoTarjetaPersonalizado = document.getElementById(
  "texto-tarjeta-personalizado",
);

const botonPersonajeJugador = document.getElementById("boton-personaje");
const botonPunio = document.getElementById("boton-punio");
const botonPatada = document.getElementById("boton-patada");
const botonBarrida = document.getElementById("boton-barrida");
const botonReiniciar = document.getElementById("boton-reiniciar");

// Modal Reglas
const modalReglas = document.getElementById("modal-reglas");
const botonReglas = document.getElementById("boton-reglas");
const botonCerrarReglas = document.getElementById("boton-cerrar-reglas");

// Modal Crear Personaje
const tarjetaPersonajePersonalizado = document.getElementById(
  "tarjeta-personaje-personalizado",
);
const modalCrearPersonaje = document.getElementById("modal-crear-personaje");
const botonCrearPersonaje = document.getElementById("boton-crear-personaje");
const botonCerrarCrearPersonaje = document.getElementById(
  "boton-cerrar-crear-personaje",
);
const inputNombrePersonalizado = document.getElementById(
  "nombre-personaje-personalizado",
);
const selectElementoPersonalizado = document.getElementById("lista-elementos");
const selectPersonajesCreados = document.getElementById(
  "lista-personajes-creados",
);
const inputRadioPersonalizado = document.getElementById(
  "input-personaje-personalizado",
);
const imagenTarjetaPersonalizado = document.getElementById(
  "imagen-tarjeta-personalizado",
);

/* LÓGICA DE JUEGO */
function azar(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function agregarPersonajes(lista) {
  divPersonajes.innerHTML = "";
  lista.forEach((personaje) => {
    let idUnico = personaje.nombrePersonaje
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    let label = document.createElement("label");
    label.className = "tarjeta-personaje";
    label.setAttribute("for", idUnico);
    label.innerHTML = `
      <input type="radio" name="personaje" id="${idUnico}" value="${personaje.nombrePersonaje}">
      <img src="${personaje.avatarPersonaje}" alt="${personaje.nombrePersonaje}">
      <span>${personaje.nombrePersonaje}</span>
    `;
    divPersonajes.appendChild(label);
  });
}

function guardarNuevoPersonaje() {
  const nombreInput = inputNombrePersonalizado.value.trim();
  const elementoSelect = selectElementoPersonalizado.value;
  const elementoLimpio = elementoSelect.split(" ")[1].toLowerCase();

  if (nombreInput === "") {
    alert("Por favor ingresa un nombre para tu personaje.");
    return;
  }

  const nombreCompleto = `${nombreInput} (${elementoSelect})`;
  let nuevoPersonaje = new Personaje(
    nombreCompleto,
    `assets/elementos/${elementoLimpio}.svg`,
    elementoSelect,
  );
  PERSONAJES_CREADOS.push(nuevoPersonaje);

  actualizarSelectPersonajesCreados();
  selectPersonajesCreados.value = PERSONAJES_CREADOS.length - 1;
  inputNombrePersonalizado.value = "";
}

function actualizarSelectPersonajesCreados() {
  selectPersonajesCreados.innerHTML = "";

  if (PERSONAJES_CREADOS.length === 0) {
    selectPersonajesCreados.innerHTML = `<option value="">No tienes ningún personaje creado!</option>`;
    return;
  }

  PERSONAJES_CREADOS.forEach((personaje, index) => {
    let option = document.createElement("option");
    option.value = index;
    option.textContent = personaje.nombrePersonaje;
    selectPersonajesCreados.appendChild(option);
  });
}

function confirmarSeleccionModal() {
  if (PERSONAJES_CREADOS.length === 0 || selectPersonajesCreados.value === "") {
    modalCrearPersonaje.close();
    return;
  }

  const indiceSeleccionado = selectPersonajesCreados.value;
  personajeSeleccionadoPersonalizado = PERSONAJES_CREADOS[indiceSeleccionado];

  imagenTarjetaPersonalizado.src =
    personajeSeleccionadoPersonalizado.avatarPersonaje;
  textoTarjetaPersonalizado.innerText =
    personajeSeleccionadoPersonalizado.nombrePersonaje;
  inputRadioPersonalizado.checked = true;

  modalCrearPersonaje.close();
}

function seleccionarPersonajeJugador() {
  sectionVerMapa.style.display = "flex";
  intervalo = setInterval(pintarPersonaje, 50);

  const radioSeleccionado = document.querySelector(
    'input[name="personaje"]:checked',
  );

  if (!radioSeleccionado) {
    alert("Selecciona un personaje para continuar");
    return;
  }

  if (radioSeleccionado.id === "input-personaje-personalizado") {
    if (!personajeSeleccionadoPersonalizado) {
      alert("Debes crear o seleccionar un personaje personalizado primero.");
      return;
    }
    nombrePersonajeJugador = personajeSeleccionadoPersonalizado.nombrePersonaje;
  } else {
    nombrePersonajeJugador = radioSeleccionado.value;
  }

  pPersonajeSeleccionado.innerHTML = `Tu personaje (${nombrePersonajeJugador}) tiene <span>${vidasJugador}</span> vidas`;

  seleccionarPersonajeEnemigo();

  seccionPersonaje.classList.add("ocultar");
  seccionReglas.classList.add("ocultar");
  seccionAtaque.classList.remove("ocultar");
}

function seleccionarPersonajeEnemigo() {
  const personajeAleatorio = azar(0, PERSONAJES.length - 1);
  // Asignamos a la variable global
  personajeEnemigo = new Personaje(
    PERSONAJES[personajeAleatorio].nombre,
    PERSONAJES[personajeAleatorio].avatar,
    PERSONAJES[personajeAleatorio].elemento,
    3,
  );
  spanPersonajeComputadora.innerHTML = `El enemigo (${personajeEnemigo.nombrePersonaje}) tiene <span>${personajeEnemigo.vidasPersonaje}</span> vidas`;
}

function calcularAtaqueComputadora() {
  return ATAQUES[azar(0, ATAQUES.length - 1)];
}

function combatir(ataqueJugador, ataqueComputadora) {
  let resultado = "";
  if (ataqueJugador === ataqueComputadora) {
    resultado = "¡EMPATE!";
  } else if (
    (ataqueJugador === "Puño ✊" && ataqueComputadora === "Barrida 👣") ||
    (ataqueJugador === "Patada 🦶" && ataqueComputadora === "Puño ✊") ||
    (ataqueJugador === "Barrida 👣" && ataqueComputadora === "Patada 🦶")
  ) {
    personajeEnemigo.recibirGolpe();
    spanPersonajeComputadora.innerHTML = `El enemigo (${personajeEnemigo.nombrePersonaje}) tiene <span>${personajeEnemigo.vidasPersonaje}</span> vidas`;
    resultado = "GANASTE LA RONDA.";
  } else {
    vidasJugador -= 1;
    pPersonajeSeleccionado.innerHTML = `Tu personaje (${nombrePersonajeJugador}) tiene <span>${vidasJugador}</span> vidas`;
    resultado = "PERDISTE LA RONDA.";
  }

  return resultado;
}

function revisarVidas() {
  if (personajeEnemigo.vidasPersonaje === 0) {
    crearMensajeFinal("🎉 ¡FELICIDADES! ¡Ganaste la batalla!", true);
  } else if (vidasJugador === 0) {
    crearMensajeFinal("💀 ¡Lo siento! El enemigo te ha derrotado.", false);
  }
}

function crearMensajeFinal(mensajeResultadoFinal, jugadorGano) {
  let parrafo = document.createElement("p");
  parrafo.className = "log-ataque victoria";
  if (jugadorGano === "PERDISTE LA RONDA.") {
    parrafo.className = "log-ataque derrota";
  } else if (jugadorGano === "¡EMPATE!") {
    parrafo.className = "log-ataque empate";
  }
  parrafo.innerHTML = `<strong>${mensajeResultadoFinal}</strong>`;
  seccionMensajes.prepend(parrafo);

  // Deshabilitar botones de ataque
  botonPunio.disabled = true;
  botonPatada.disabled = true;
  botonBarrida.disabled = true;

  // Mostrar botón reiniciar
  seccionReiniciar.classList.remove("ocultar");
}

function crearMensaje(ataqueJugador, ataqueComputadora, resultado) {
  let parrafo = document.createElement("p");
  parrafo.className = "log-ataque victoria";
  if (resultado === "PERDISTE LA RONDA.") {
    parrafo.className = "log-ataque derrota";
  }
  parrafo.innerHTML = `Atacaste con <strong>${ataqueJugador}</strong> | Enemigo usó <strong>${ataqueComputadora}</strong><br><em>Resultado: ${resultado}</em>`;
  seccionMensajes.prepend(parrafo);
}

function jugarRonda(ataqueJugador) {
  let ataqueComputadora = calcularAtaqueComputadora();
  let resultado = combatir(ataqueJugador, ataqueComputadora);
  crearMensaje(ataqueJugador, ataqueComputadora, resultado);
  revisarVidas();
}

function reiniciarJuego() {
  location.reload();
}

function iniciarJuego() {
  sectionVerMapa.style.display = "none";
  botonPersonajeJugador.addEventListener("click", seleccionarPersonajeJugador);
  botonPunio.addEventListener("click", () => jugarRonda("Puño ✊"));
  botonPatada.addEventListener("click", () => jugarRonda("Patada 🦶"));
  botonBarrida.addEventListener("click", () => jugarRonda("Barrida 👣"));
  botonReiniciar.addEventListener("click", reiniciarJuego);

  // Modal Reglas
  botonReglas.addEventListener("click", () => modalReglas.showModal());
  botonCerrarReglas.addEventListener("click", () => modalReglas.close());

  // Modal Crear Personaje
  tarjetaPersonajePersonalizado.addEventListener("click", (e) => {
    if (e.target !== inputRadioPersonalizado) {
      modalCrearPersonaje.showModal();
    }
  });

  botonCrearPersonaje.addEventListener("click", guardarNuevoPersonaje);
  botonCerrarCrearPersonaje.addEventListener("click", confirmarSeleccionModal);
}

window.addEventListener("load", () => {
  agregarPersonajes(PERSONAJES);
  iniciarJuego();
});

/* TODO LO NUEVO DEL MAPA */
/* Referencias al DOM */
const sectionVerMapa = document.getElementById("ver-mapa");
const botonMoverDerecha = document.getElementById("boton-mover-derecha");
const botonMoverIzquierda = document.getElementById("boton-mover-izquierda");
const botonMoverArriba = document.getElementById("boton-mover-arriba");
const botonMoverAbajo = document.getElementById("boton-mover-abajo");
const mapa = document.getElementById("mapa");

/* Variables globales */
let intervalo; //Dentro de esta variable vamos a hacer un setInterval, esta es la función que va llamando una función constantemente, esperando un poco de tiempo, así es que vamos a la línea de código donde estamos mostrando el mapa:

/* Logica */
let lienzo = mapa.getContext("2d");
let imagenDeAang = new Image();
imagenDeAang.src = aang.avatarPersonaje; //esto ya esta cargado dentro de su objeto

imagenDeAang.onload = function () {
  lienzo.drawImage(imagenDeAang, 20, 40, 100, 100);
};

function pintarPersonaje() {
  //dentro pegamos el código y hacemos modificaciones
  lienzo.clearRect(0, 0, mapa.width, mapa.height); //Esta función limpia nuestro canvas, le decimos que limpiar
  lienzo.drawImage(
    aang.mapaFoto, //cambiamos cada parámetro
    (aang.x = aang.x + aang.velocidadX), //Ajustamos para ir actualizando dependiando de la velocidad
    (aang.y = aang.y + aang.velocidadY),
    aang.ancho,
    aang.alto,
  );
}

//a la posición que tenía x, le sumamos 5, esto quiere decir que se va amover 5px en x
function moverAang({ derecha = 0, izquierda = 0, arriba = 0, abajo = 0 }) {
  //esta función va a actualizar la posición en x
  aang.velocidadX = derecha + izquierda;
  aang.velocidadY = arriba + abajo;
  console.log(derecha, izquierda, arriba, abajo);
  console.log("Velocidad X:", aang.velocidadX, "Velocidad Y:", aang.velocidadY);
}

function detenerAang() {
  aang.velocidadX = 0;
  aang.velocidadY = 0;
}

botonMoverDerecha.addEventListener("mousedown", () =>
  moverAang({ derecha: 5 }),
);
botonMoverDerecha.addEventListener("mouseup", detenerAang);

botonMoverIzquierda.addEventListener("mousedown", () =>
  moverAang({ izquierda: -5 }),
);
botonMoverIzquierda.addEventListener("mouseup", detenerAang);

botonMoverArriba.addEventListener("mousedown", () => moverAang({ arriba: -5 }));
botonMoverArriba.addEventListener("mouseup", detenerAang);

botonMoverAbajo.addEventListener("mousedown", () => moverAang({ abajo: 5 }));
botonMoverAbajo.addEventListener("mouseup", detenerAang);
