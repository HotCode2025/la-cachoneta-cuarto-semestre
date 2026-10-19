import pygame
import recursos
from constantes import (
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    ENEMIGO_VELOCIDAD,
    INVULNERABLE_FRAMES,
    PARPADEO_FRAMES,
)

class Personaje:
    def __init__(self, x, y):
        self.image = recursos.cargar_imagen('Speeder.png', recursos.TAMANO_NAVE)
        self.shape = self.image.get_rect(center=(x, y))
        self.lasers = []
        self.energia = 100
        self.invulnerable = 0  # frames que le quedan de inmunidad

    def mover(self, dx, dy):
        self.shape.x += dx
        self.shape.y += dy

        #No dejar que el personaje se salga de la pantalla
        self.shape.clamp_ip(pygame.Rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT))

    def lanzar_laser(self):
        self.lasers.append(Laser(self.shape.centerx, self.shape.top))

    def recibir_dano(self):
        """Aplica el dano. Devuelve False si el personaje se quedo sin energia."""
        if self.invulnerable > 0:
            return True  # todavia es inmune, el golpe no cuenta

        self.energia -= 10
        self.invulnerable = INVULNERABLE_FRAMES
        if self.energia <= 0:
            self.energia = 0
            return False
        return True

    def actualizar(self):
        """Avanza el estado del personaje un frame."""
        if self.invulnerable > 0:
            self.invulnerable -= 1

        for laser in self.lasers[:]:
            laser.mover()
            if laser.rect.bottom < 0:  #el laser salio de la pantalla
                self.lasers.remove(laser)

    def es_visible(self):
        """Mientras es invulnerable parpadea: visible la mitad del tiempo."""
        if self.invulnerable == 0:
            return True
        return (self.invulnerable // PARPADEO_FRAMES) % 2 == 0

    def dibujar(self, screen):
        for laser in self.lasers:
            laser.dibujar(screen)

        if self.es_visible():
            screen.blit(self.image, self.shape.topleft)

        #dibujar la barra de energia
        pygame.draw.rect(screen, (255, 0, 0), (10, 10, 100, 10)) #barra de fondo roja
        pygame.draw.rect(screen, (0, 255, 0), (10, 10, self.energia, 10)) #barra de energia verde

class Enemigo:
        def __init__(self, x, y, velocidad=ENEMIGO_VELOCIDAD):
            self.image = recursos.cargar_imagen('enemigo1.png', recursos.TAMANO_ENEMIGO)
            self.rect = self.image.get_rect(topleft=(x , y))
            self.y = float(y)         #posicion real, para poder usar velocidades decimales
            self.velocidad = velocidad

        def mover(self):
            self.y += self.velocidad  #velocidad de movimiento del enemigo
            self.rect.y = int(self.y)

        def dibujar(self, screen):
            screen.blit(self.image, self.rect.topleft)

class Laser:
        def __init__(self,x,y):
            self.image = recursos.cargar_imagen('lase1.png', recursos.TAMANO_LASER)
            self.rect = self.image.get_rect(center=(x , y))

        def mover(self):
            self.rect.y -= 10

        def dibujar(self, screen):
            screen.blit(self.image, self.rect.topleft)

class Explosion:
    def __init__(self, x, y):
        self.images = recursos.frames_explosion()  #ya estan en cache, no toca el disco
        self.index = 0 #indice de la animacion
        self.image = self.images[self.index]
        self.rect = self.image.get_rect(center=(x, y))
        self.frame_rate = 0 # contador de los frames de la animacion
        self.max_frames = 4 # frames por imagenes

    def actualizar(self):
        #actualizar la animacion
        self.frame_rate += 1
        if self.frame_rate >= self.max_frames:
            self.frame_rate = 0
            self.index += 1
            if self.index >= len(self.images):
                return False #la animacion ha terminado
            self.image = self.images[self.index]
        return True #la animacion sigue activa

    def dibujar(self, screen):
        #Dibuja la imagen en la pantalla
        screen.blit(self.image, self.rect.topleft)
