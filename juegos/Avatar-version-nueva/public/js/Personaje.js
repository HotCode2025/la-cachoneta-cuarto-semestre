export class Personaje {
  constructor(nombre, avatar, elemento, vidasMax = 3) {
    this.nombre = nombre;
    this.avatar = avatar;
    this.elemento = elemento;
    this.vidasMax = vidasMax;
    this.vidas = vidasMax;
    this.ataques = [];

    this.mapaFoto = new Image();
    this.mapaFoto.src = avatar;
    this.x = 20;
    this.y = 30;
    this.ancho = 80;
    this.alto = 80;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }

  get nombrePersonaje() {
    return this.nombre;
  }

  get avatarPersonaje() {
    return this.avatar;
  }

  get elementoPersonaje() {
    return this.elemento;
  }

  get vidasPersonaje() {
    return this.vidas;
  }

  recibirGolpe(danio = 1) {
    this.vidas = Math.max(0, this.vidas - danio);
    return this.vidas;
  }

  estaDerrotado() {
    return this.vidas <= 0;
  }

  reiniciarVidas() {
    this.vidas = this.vidasMax;
  }
}
