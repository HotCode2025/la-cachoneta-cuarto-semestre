import { Personaje } from './Personaje.js'

// Variables globales del juego
let vidasJugador = 3
let vidasEnemigo = 3
let nombrePersonajeJugador = ""

let zuko = new Personaje("Zuko 🔥", "assets/Zuko.ico", "Fuego 🔥")
let katara = new Personaje("Katara 💧", "assets/Katara.ico", "Agua 💧")
let aang = new Personaje("Aang 🌪️", "assets/Aang.ico", "Aire 🌬️")
let toph = new Personaje("Toph 🌱", "assets/Toph.ico", "Tierra 🌍")

const PERSONAJES = [zuko, katara, aang, toph]
const ATAQUES = ["Puño ✊", "Patada 🦶", "Barrida 👣"]

// Colección de múltiples personajes creados por el jugador y el activo
let PERSONAJES_CREADOS = []
let personajeSeleccionadoPersonalizado = null

/* REFERENCIAS AL DOM */
const seccionPersonaje = document.getElementById("seleccionar-personaje")
const seccionAtaque = document.getElementById("seleccionar-ataque")
const seccionMensajes = document.getElementById("mensajes")
const seccionReiniciar = document.getElementById("reiniciar")
const seccionReglas = document.getElementById("reglas-juego")

const divPersonajes = document.getElementById("div-personajes")
const pPersonajeSeleccionado = document.getElementById("personaje-seleccionado")
const spanPersonajeComputadora = document.getElementById("personaje-computadora")
const textoTarjetaPersonalizado = document.getElementById("texto-tarjeta-personalizado")

const botonPersonajeJugador = document.getElementById("boton-personaje")
const botonPunio = document.getElementById("boton-punio")
const botonPatada = document.getElementById("boton-patada")
const botonBarrida = document.getElementById("boton-barrida")
const botonReiniciar = document.getElementById("boton-reiniciar")

// Modal Reglas
const modalReglas = document.getElementById("modal-reglas")
const botonReglas = document.getElementById("boton-reglas")
const botonCerrarReglas = document.getElementById("boton-cerrar-reglas")

// Modal Crear Personaje
const tarjetaPersonajePersonalizado = document.getElementById("tarjeta-personaje-personalizado")
const modalCrearPersonaje = document.getElementById("modal-crear-personaje")
const botonCrearPersonaje = document.getElementById("boton-crear-personaje")
const botonCerrarCrearPersonaje = document.getElementById("boton-cerrar-crear-personaje")
const inputNombrePersonalizado = document.getElementById("nombre-personaje-personalizado")
const selectElementoPersonalizado = document.getElementById("lista-elementos")
const selectPersonajesCreados = document.getElementById("lista-personajes-creados")
const inputRadioPersonalizado = document.getElementById("input-personaje-personalizado")
const imagenTarjetaPersonalizado = document.getElementById("imagen-tarjeta-personalizado")

/* LÓGICA DE JUEGO */
function azar(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function agregarPersonajes(lista) {
  divPersonajes.innerHTML = ""
  lista.forEach(personaje => {
    let idUnico = personaje.nombrePersonaje.toLowerCase().replace(/\s+/g, '')
    let label = document.createElement('label')
    label.className = 'tarjeta-personaje'
    label.setAttribute('for', idUnico)
    label.innerHTML = `
      <input type="radio" name="personaje" id="${idUnico}" value="${personaje.nombrePersonaje}">
      <img src="${personaje.avatarPersonaje}" alt="${personaje.nombrePersonaje}">
      <span>${personaje.nombrePersonaje}</span>
    `
    divPersonajes.appendChild(label)
  })
}

// ACA SE MANEJA TODO LO QUE ES LA CREACION DE UN PERSONAJE PERSONALIZADO, GUARDARLO Y SELECCIONARLO PARA JUGAR
// Guarda un personaje en el arreglo y actualiza el select
function guardarNuevoPersonaje() {
  const nombreInput = inputNombrePersonalizado.value.trim()
  const elementoSelect = selectElementoPersonalizado.value
  const elementoLimpio = elementoSelect.split(" ")[1].toLowerCase()

  if (nombreInput === "") {
    alert("Por favor ingresa un nombre para tu personaje.")
    return
  }

  const nombreCompleto = `${nombreInput} (${elementoSelect})`
  
  // Crear instancia y guardarla en la lista de creados
  let nuevoPersonaje = new Personaje(nombreCompleto, `assets/elementos/${elementoLimpio}.svg`, elementoSelect)
  PERSONAJES_CREADOS.push(nuevoPersonaje)

  // Actualizar el menú desplegable del modal
  actualizarSelectPersonajesCreados()

  // Seleccionar automáticamente el personaje recién creado
  selectPersonajesCreados.value = PERSONAJES_CREADOS.length - 1
  inputNombrePersonalizado.value = "" // Limpia el input
}

// Llena el <select> con los personajes guardados
function actualizarSelectPersonajesCreados() {
  selectPersonajesCreados.innerHTML = ""

  if (PERSONAJES_CREADOS.length === 0) {
    selectPersonajesCreados.innerHTML = `<option value="">No tienes ningún personaje creado!</option>`
    return
  }

  PERSONAJES_CREADOS.forEach((personaje, index) => {
    let option = document.createElement("option")
    option.value = index
    option.textContent = personaje.nombrePersonaje
    selectPersonajesCreados.appendChild(option)
  })
}

// Confirma la selección desde el select y cierra el modal
function confirmarSeleccionModal() {
  if (PERSONAJES_CREADOS.length === 0 || selectPersonajesCreados.value === "") {
    modalCrearPersonaje.close()
    return
  }

  const indiceSeleccionado = selectPersonajesCreados.value
  personajeSeleccionadoPersonalizado = PERSONAJES_CREADOS[indiceSeleccionado]

  // Actualizamos la tarjeta en la pantalla principal
  imagenTarjetaPersonalizado.src = personajeSeleccionadoPersonalizado.avatarPersonaje
  textoTarjetaPersonalizado.innerText = personajeSeleccionadoPersonalizado.nombrePersonaje
  inputRadioPersonalizado.checked = true

  modalCrearPersonaje.close()
}

function seleccionarPersonajeJugador() {
  const radioSeleccionado = document.querySelector('input[name="personaje"]:checked')

  if (!radioSeleccionado) {
    alert("Selecciona un personaje para continuar")
    return
  }

  // Si eligió la tarjeta de personalizados
  if (radioSeleccionado.id === "input-personaje-personalizado") {
    if (!personajeSeleccionadoPersonalizado) {
      alert("Debes crear o seleccionar un personaje personalizado primero.")
      return
    }
    nombrePersonajeJugador = personajeSeleccionadoPersonalizado.nombrePersonaje
  } else {
    // Si eligió uno de los predeterminados
    nombrePersonajeJugador = radioSeleccionado.value
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

function jugarRonda(ataqueJugador) {
  let ataqueComputadora = calcularAtaqueComputadora()
  let resultado = combatir(ataqueJugador, ataqueComputadora)
  crearMensaje(ataqueJugador, ataqueComputadora, resultado)
}

function iniciarJuego() {
  botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador)
  botonPunio.addEventListener('click', () => jugarRonda('Puño ✊'))
  botonPatada.addEventListener('click', () => jugarRonda('Patada 🦶'))
  botonBarrida.addEventListener('click', () => jugarRonda('Barrida 👣'))

  // Modal Reglas
  botonReglas.addEventListener('click', () => modalReglas.showModal())
  botonCerrarReglas.addEventListener('click', () => modalReglas.close())

  // Modal Crear Personaje
  tarjetaPersonajePersonalizado.addEventListener('click', (e) => {
    if (e.target !== inputRadioPersonalizado) {
      modalCrearPersonaje.showModal()
    }
  })
  
  botonCrearPersonaje.addEventListener('click', guardarNuevoPersonaje)
  botonCerrarCrearPersonaje.addEventListener('click', confirmarSeleccionModal)
}

window.addEventListener('load', () => {
  agregarPersonajes(PERSONAJES)
  iniciarJuego()
})