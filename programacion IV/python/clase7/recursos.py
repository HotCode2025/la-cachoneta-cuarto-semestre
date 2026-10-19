"""Carga y cachea imagenes y sonidos.

La idea es leer cada archivo del disco UNA sola vez. Antes, cada explosion
abria y decodificaba 9 PNG de 192x192 en pleno frame y eso producia tirones.

Importante: estas funciones necesitan que ya exista una ventana
(pygame.display.set_mode) porque usan convert()/convert_alpha().
"""

import os
import pygame
from constantes import ASSETS_PATH

#Cache: la clave incluye el tamano, asi la misma imagen en dos tamanos
#distintos se guarda por separado
_imagenes = {}
_sonidos = {}

TAMANO_NAVE = (95, 95)
TAMANO_ENEMIGO = (95, 95)
TAMANO_LASER = (20, 20)
TAMANO_EXPLOSION = (95, 95)
CANTIDAD_FRAMES_EXPLOSION = 9


def cargar_imagen(nombre, tamano=None, con_alpha=True):
    """Devuelve la imagen pedida, cargandola solo la primera vez.

    con_alpha=False para imagenes opacas (fondos): convert() blitea mas
    rapido que convert_alpha() cuando no hace falta transparencia.
    """
    clave = (nombre, tamano, con_alpha)
    if clave not in _imagenes:
        imagen = pygame.image.load(os.path.join(ASSETS_PATH, 'images', nombre))
        imagen = imagen.convert_alpha() if con_alpha else imagen.convert()
        if tamano is not None:
            imagen = pygame.transform.scale(imagen, tamano)
        _imagenes[clave] = imagen
    return _imagenes[clave]


def cargar_sonido(nombre):
    """Devuelve el sonido pedido, cargandolo solo la primera vez."""
    if nombre not in _sonidos:
        _sonidos[nombre] = pygame.mixer.Sound(os.path.join(ASSETS_PATH, 'sounds', nombre))
    return _sonidos[nombre]


def frames_explosion(tamano=TAMANO_EXPLOSION):
    """Devuelve la lista de frames de la animacion de explosion."""
    clave = ('__explosion__', tamano)
    if clave not in _imagenes:
        _imagenes[clave] = [
            cargar_imagen(f'regularExplosion{i:03}.png', tamano)
            for i in range(CANTIDAD_FRAMES_EXPLOSION)
        ]
    return _imagenes[clave]


def precargar():
    """Carga todo lo que usa la partida, antes de que arranque el juego."""
    cargar_imagen('Speeder.png', TAMANO_NAVE)
    cargar_imagen('enemigo1.png', TAMANO_ENEMIGO)
    cargar_imagen('lase1.png', TAMANO_LASER)
    frames_explosion()
    cargar_sonido('laserdis.mp3')
    cargar_sonido('explosion.mp3')


def reproducir_musica(nombre, loops=-1):
    """Arranca la musica de fondo. loops=-1 significa en bucle infinito."""
    pygame.mixer.music.load(os.path.join(ASSETS_PATH, 'sounds', nombre))
    pygame.mixer.music.play(loops)
