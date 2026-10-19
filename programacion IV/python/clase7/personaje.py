import pygame
import os #Proporcina funcionalidades para interactuar con el sistema
from constantes import ASSETS_PATH, SCREEN_WIDTH, SCREEN_HEIGHT

class Personaje:
    def __init__(self, x, y):
        #Construye la ruta a la imagen del personaje
        self.image = pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'Speeder.png'))
        self.image = pygame.transform.scale(self.image, (95, 95))
        self.shape = self.image.get_rect(center=(x, y))
        self.lasers = []
        self.energia = 100

    def mover(self, dx, dy):
        self.shape.x += dx
        self.shape.y += dy

        #No dejar que el personaje se salga de la pantalla
        self.shape.clamp_ip(pygame.Rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT))

    def lanzar_laser(self):
        laser = Laser(self.shape.centerx, self.shape.top)
        self.lasers.append(laser)

    def recibir_dano(self):
        self.energia -= 10
        if self.energia <= 0:
            self.energia = 0
            return False
        return True

    def dibujar(self, screen):
        screen.blit(self.image, self.shape.topleft)
        for laser in self.lasers[:]:
            laser.mover()
            if laser.rect.bottom < 0:   #el laser salio de la pantalla
                self.lasers.remove(laser)
                continue
            laser.dibujar(screen)

        #dibujar la barra de energia
        pygame.draw.rect(screen, (255, 0, 0), (10, 10, 100, 10)) #barra de fondo roja
        pygame.draw.rect(screen, (0, 255, 0), (10, 10, self.energia, 10)) #barra de energia verde

class Enemigo:
        def __init__(self, x, y):
            self.image = pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'enemigo1.png'))
            self.image = pygame.transform.scale(self.image, (95,95))
            self.rect = self.image.get_rect(topleft=(x , y))

        def mover(self):
            self.rect.y += 5 #velocidad de movimiento del enemigo

        def dibujar(self, screen):
            screen.blit(self.image, self.rect.topleft)

class Laser:
        def __init__(self,x,y):
            self.image = pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'lase1.png'))
            self.image = pygame.transform.scale(self.image, (20, 20))
            self.rect = self.image.get_rect(center=(x , y))

        def mover(self):
            self.rect.y -= 10

        def dibujar(self, screen):
            screen.blit(self.image, self.rect.topleft)

class Explosion:
    def __init__(self, x, y):
        self.images = [
            pygame.transform.scale(
                pygame.image.load(os.path.join(ASSETS_PATH, 'images', f'regularExplosion{i:03}.png')),
                (95, 95),
            )
            for i in range(9)
        ]
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
