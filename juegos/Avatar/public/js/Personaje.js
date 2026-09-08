export class Personaje {
  constructor(nombre, avatar, elemento, vidasMax = 3) {
    this.nombre = nombre
    this.avatar = avatar
    this.elemento = elemento
    this.vidasMax = vidasMax
    this.vidas = vidasMax
  }

  get nombrePersonaje() {
    return this.nombre
  }

  get avatarPersonaje() {
    return this.avatar
  }

  get elementoPersonaje() {
    return this.elemento
  }

  get vidasPersonaje() {
    return this.vidas
  }

  // Metodos que voy a necesitar a futuro
  recibirGolpe(danio = 1) {
    this.vidas = Math.max(0, this.vidas - danio)
    return this.vidas
  }

  estaDerrotado() {
    return this.vidas <= 0
  }

  reiniciarVidas() {
    this.vidas = this.vidasMax
  }
}