// Variables globales del juego
let vidasJugador = 3
let vidasEnemigo = 3
let nombrePersonajeJugador = ""
let nombrePersonajeEnemigo = ""

const PERSONAJES = ["Zuko 🔥", "Katara 💧", "Aang 🌪️", "Toph 🌱"]
const ATAQUES = ["Puño ✊", "Patada 🦶", "Barrida 👣"]

// Referencias al DOM - inputs
const radioZuko = document.getElementById("zuko")
const radioKatara = document.getElementById("katara")
const radioAang = document.getElementById("aang")
const radioToph = document.getElementById("toph")

// Referencias al DOM - secciones
const seccionPersonaje = document.getElementById("seleccionar-personaje")
const seccionAtaque = document.getElementById("seleccionar-ataque")
const seccionMensajes = document.getElementById("mensajes")
const seccionReiniciar = document.getElementById("reiniciar")
const seccionReglas = document.getElementById("reglas-juego")

// Referencias al DOM - textos / spans
const pPersonajeSeleccionado = document.getElementById("personaje-seleccionado")
const spanPersonajeComputadora = document.getElementById("personaje-computadora")

// Referencias al DOM - botones
const botonPersonajeJugador = document.getElementById("boton-personaje")
const botonPunio = document.getElementById("boton-punio")
const botonPatada = document.getElementById("boton-patada")
const botonBarrida = document.getElementById("boton-barrida")
const botonReiniciar = document.getElementById("boton-reiniciar")

// Referencias al DOM para el Modal
const modalReglas = document.getElementById("modal-reglas")
const botonReglas = document.getElementById("boton-reglas")
const botonCerrarReglas = document.getElementById("boton-cerrar-reglas")

// Lógica del Juego
function azar(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Eventos para abrir y cerrar pop-up de reglas del juego
botonReglas.addEventListener('click', () => {
  modalReglas.showModal()
})

botonCerrarReglas.addEventListener('click', () => {
  modalReglas.close()
})

function seleccionarPersonajeJugador() {
  if (radioZuko.checked) {
    nombrePersonajeJugador = "Zuko 🔥"
  } else if (radioKatara.checked) {
    nombrePersonajeJugador = "Katara 💧"
  } else if (radioAang.checked) {
    nombrePersonajeJugador = "Aang 🌪️"
  } else if (radioToph.checked) {
    nombrePersonajeJugador = "Toph 🌱"
  } else {
    alert("Selecciona un personaje para continuar")
    return
  }

  pPersonajeSeleccionado.innerHTML = `Tu personaje (${nombrePersonajeJugador}) tiene <span>${vidasJugador}</span> vidas`
  
  seleccionarPersonajeEnemigo()

  // Transición de pantallas
  seccionPersonaje.classList.add("ocultar")
  seccionReglas.classList.add("ocultar")
  seccionAtaque.classList.remove("ocultar")
}

function seleccionarPersonajeEnemigo() {
  const personajeAleatorio = azar(0, PERSONAJES.length - 1)
  nombrePersonajeEnemigo = PERSONAJES[personajeAleatorio]
  spanPersonajeComputadora.innerHTML = `El enemigo (${nombrePersonajeEnemigo}) tiene <span>${vidasEnemigo}</span> vidas`
}

function calcularAtaqueComputadora() {
  return ATAQUES[azar(0, ATAQUES.length - 1)]
}

function combatir(ataqueJugador, ataqueComputadora) {
  if (ataqueJugador === ataqueComputadora) {
    return '¡EMPATE!'
  } else if (
    (ataqueJugador === 'Puño ✊' && ataqueComputadora === 'Barrida 👣') ||
    (ataqueJugador === 'Patada 🦶' && ataqueComputadora === 'Puño ✊') ||
    (ataqueJugador === 'Barrida 👣' && ataqueComputadora === 'Patada 🦶')
  ) {
    return 'GANASTE LA RONDA.'
  } else {
    return 'PERDISTE LA RONDA.'
  }
}

function crearMensaje(ataqueJugador, ataqueComputadora, resultado) {
  let parrafo = document.createElement('p')
  parrafo.className = 'log-ataque'
  parrafo.innerHTML = `Atacaste con <strong>${ataqueJugador}</strong> | Enemigo usó <strong>${ataqueComputadora}</strong><br><em>Resultado: ${resultado}</em>`
  seccionMensajes.prepend(parrafo)
}

function iniciarJuego() {
  botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador)

  botonPunio.addEventListener('click', () => jugarRonda('Puño ✊'))
  botonPatada.addEventListener('click', () => jugarRonda('Patada 🦶'))
  botonBarrida.addEventListener('click', () => jugarRonda('Barrida 👣'))
}

function jugarRonda(ataqueJugador) {
  let ataqueComputadora = calcularAtaqueComputadora()
  let resultado = combatir(ataqueJugador, ataqueComputadora)
  crearMensaje(ataqueJugador, ataqueComputadora, resultado)
}

window.addEventListener('load', iniciarJuego)