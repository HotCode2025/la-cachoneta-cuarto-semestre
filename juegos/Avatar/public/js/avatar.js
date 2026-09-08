import { Personaje } from './Personaje.js'

// Variables globales del juego
let vidasJugador = 3
let vidasEnemigo = 3
let nombrePersonajeJugador = ""
let nombrePersonajeEnemigo = ""

let zuko = new Personaje("Zuko 🔥", "assets/Zuko.ico", "Fuego 🔥")
let katara = new Personaje("Katara 💧", "assets/Katara.ico", "Agua 💧")
let aang = new Personaje("Aang 🌪️", "assets/Aang.ico", "Aire 🌬️")
let toph = new Personaje("Toph 🌱", "assets/Toph.ico", "Tierra 🌍")

const PERSONAJES = [zuko, katara, aang, toph]
const ATAQUES = ["Puño ✊", "Patada 🦶", "Barrida 👣"]

/* REFERENCIAS AL DOM */
// secciones
const seccionPersonaje = document.getElementById("seleccionar-personaje")
const seccionAtaque = document.getElementById("seleccionar-ataque")
const seccionMensajes = document.getElementById("mensajes")
const seccionReiniciar = document.getElementById("reiniciar")
const seccionReglas = document.getElementById("reglas-juego")

// divs
const divPersonajes = document.getElementById("div-personajes")

// textos / spans
const pPersonajeSeleccionado = document.getElementById("personaje-seleccionado")
const spanPersonajeComputadora = document.getElementById("personaje-computadora")

// botones
const botonPersonajeJugador = document.getElementById("boton-personaje")
const botonPunio = document.getElementById("boton-punio")
const botonPatada = document.getElementById("boton-patada")
const botonBarrida = document.getElementById("boton-barrida")
const botonReiniciar = document.getElementById("boton-reiniciar")

// Modal de reglas del juego
const modalReglas = document.getElementById("modal-reglas")
const botonReglas = document.getElementById("boton-reglas")
const botonCerrarReglas = document.getElementById("boton-cerrar-reglas")

// LOGICA
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
  // Ya que ahora los personajes se crean de forma dinamia a travez de una clase, no puedo hacer referencia a los radio inputs desde afuera de la funcion ya que no existen,
  // por lo que debo obtenerlos dentro de la funcion cuando los personajes ya han sido creados y agregados al DOM
  const radioZuko = document.getElementById("zuko")
  const radioKatara = document.getElementById("katara")
  const radioAang = document.getElementById("aang")
  const radioToph = document.getElementById("toph")

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
  let personajeEnemigo = PERSONAJES[personajeAleatorio]
  spanPersonajeComputadora.innerHTML = `El enemigo (${personajeEnemigo.nombrePersonaje}) tiene <span>${personajeEnemigo.vidasPersonaje}</span> vidas`
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

function agregarPersonajes(PERSONAJES) {
  /* 
  <label for="zuko" class="tarjeta-personaje">
    <input type="radio" name="personaje" id="zuko">
    <img src="assets/Zuko.ico" alt="Zuko">
    <span>Zuko 🔥</span>
  </label>
  */
  for (let i = 0; i < PERSONAJES.length; i++) {
    let personaje = PERSONAJES[i]
    let label = document.createElement('label')
    label.className = 'tarjeta-personaje'
    label.setAttribute('for', personaje.nombrePersonaje.toLowerCase().split(' ')[0])
    label.innerHTML = `
      <input type="radio" name="personaje" id="${personaje.nombrePersonaje.toLowerCase().split(' ')[0]}">
      <img src="${personaje.avatarPersonaje}" alt="${personaje.nombrePersonaje}">
      <span>${personaje.nombrePersonaje}</span>
    `
    divPersonajes.appendChild(label)
  }
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

window.addEventListener('load', () => {
  agregarPersonajes(PERSONAJES)
  iniciarJuego()
})