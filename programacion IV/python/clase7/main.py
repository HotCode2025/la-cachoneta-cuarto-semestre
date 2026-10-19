import pygame
import sys
import random
import os
from personaje import Personaje, Enemigo, Explosion
from constantes import SCREEN_WIDTH,SCREEN_HEIGHT, ASSETS_PATH

# Inicializa el juego

def mostrar_imagen_inicial(screen, imagen_path, duracion):
    imagen = pygame.image.load(imagen_path).convert()
    imagen = pygame.transform.scale(imagen, (SCREEN_WIDTH, SCREEN_HEIGHT))

    #Bucle para mostrar la imagen principal con una opacidad
    clock = pygame.time.Clock()

    tiempo_inicial = pygame.time.get_ticks()
    tiempo_total = duracion #Duracion en milisegundos (8000 ms = 8 segundos)
    while pygame.time.get_ticks() - tiempo_inicial < tiempo_total:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        #Calcular el tiempo transcurrido
        tiempo_transcurrido = pygame.time.get_ticks() - tiempo_inicial

        #Calcular nuevo valor de alpha basado en el tiempo transcurrido
        alpha = 255 - (255 * tiempo_transcurrido / tiempo_total)
        if alpha < 0:
            alpha = 0

        #Establecer transpancia y dibujar la imagen
        imagen.set_alpha(alpha)
        screen.fill((0, 0, 0))  # Limpiar la pantalla
        screen.blit(imagen, (0, 0))
        pygame.display.flip()

        clock.tick(60)  # Limitar a 60 FPS

def main():
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    pygame.display.set_caption("Amenaza Fantasma")

    #Definir la ruta a la imagen inicial
    imagen_inicial_path = os.path.join(ASSETS_PATH, 'images', 'inicio', 'logo.png')

    #Usa os.path.join para construir la ruta del icono
    icon = pygame.image.load(os.path.join(ASSETS_PATH, 'images', '001.jfif'))
    pygame.display.set_icon(icon)

    #Mostrar la pantalla de inicio
    mostrar_imagen_inicial(screen, imagen_inicial_path, 3000)

    #Inicializar los fondos

    fondo2 = pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'fondo2.jfif'))
    fondo2 = pygame.transform.scale(fondo2, (SCREEN_WIDTH, SCREEN_HEIGHT))

    fondo3 = pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'fondo3.jpg'))
    fondo3 = pygame.transform.scale(fondo3, (SCREEN_WIDTH, SCREEN_HEIGHT))

    #Inicializar el fondo actual
    fondo_actual = fondo2

    #Usa os.path.join para construir la ruta de los sonidos
    sonido_laser = pygame.mixer.Sound(os.path.join(ASSETS_PATH, 'sounds', 'laserdis.mp3'))
    sonido_explosion = pygame.mixer.Sound(os.path.join(ASSETS_PATH, 'sounds', 'explosion.mp3'))

    #Reproducir sonido de fondo
    pygame.mixer.music.load(os.path.join(ASSETS_PATH, 'sounds', 'efectos.mp3'))
    pygame.mixer.music.play(-1)  # Reproduce en bucle

    personaje = Personaje(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)
    enemigos = []
    explosiones = []
    puntos = 0
    nivel = 1
    cooldown_laser = 0  # frames que faltan para poder disparar de nuevo

    font = pygame.font.Font(None, 36)

    #Movimiento de boton de flechas

    clock = pygame.time.Clock()
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        keys = pygame.key.get_pressed()
        dx, dy = 0, 0
        if keys[pygame.K_LEFT]:
            dx = -5
        if keys[pygame.K_RIGHT]:
            dx = 5
        if keys[pygame.K_UP]:
            dy = -5
        if keys[pygame.K_DOWN]:
            dy = 5

        personaje.mover(dx, dy)

        if cooldown_laser > 0:
            cooldown_laser -= 1

        if keys[pygame.K_SPACE] and cooldown_laser == 0:
            personaje.lanzar_laser()
            sonido_laser.play()
            cooldown_laser = 10  # espera 10 frames entre disparos

        # Actualizar enemigos y verificar colisiones
        for enemigo in enemigos[:]:
            enemigo.mover()
            if enemigo.rect.top > SCREEN_HEIGHT:
                enemigos.remove(enemigo)
                continue

            #Verificar colision con laser
            destruido = False
            for laser in personaje.lasers[:]:
                if enemigo.rect.colliderect(laser.rect):
                    explosiones.append(Explosion(enemigo.rect.centerx, enemigo.rect.centery))
                    enemigos.remove(enemigo) #Elimina el enemigo
                    personaje.lasers.remove(laser) #Elimina el laser
                    sonido_explosion.play()
                    puntos += 10 #Incrementa los puntos por cada enemigo destruido
                    destruido = True
                    break #Sale del bucle

            if destruido:
                continue

            #Verificar colision con el personaje
            if enemigo.rect.colliderect(personaje.shape):
                explosiones.append(Explosion(enemigo.rect.centerx, enemigo.rect.centery))
                enemigos.remove(enemigo)
                sonido_explosion.play()
                if not personaje.recibir_dano():
                    running = False  # Termina el juego si la energia llega a 0

        #Generar enemigos aleatoriamente
        if random.randint(0, 10) < 2:  # Ajusta la probabilidad de aparicion
            x = random.randint(0, SCREEN_WIDTH - 50) # Nos asegura tener al enemigo dentro de la pantalla
            enemigos.append(Enemigo(x, 0))

        #Actualizar explosiones
        explosiones = [explosion for explosion in explosiones if explosion.actualizar()]

        #Actualizar el fondo cada 250 puntos
        nivel = puntos // 250 + 1
        fondo_actual = fondo2 if nivel % 2 == 1 else fondo3

        #Dibujar el fondo y objetos en la pantalla
        screen.blit(fondo_actual, (0, 0))

        #Dibujar el personaje
        personaje.dibujar(screen)

        #Dibujar enemigos
        for enemigo in enemigos:
            enemigo.dibujar(screen)

        #Dibujar explosiones
        for explosion in explosiones:
            explosion.dibujar(screen)

        #Mostrar el marcador y el nivel
        texto_puntos = font.render(f"Puntos: {puntos}", True, (255, 255, 255))
        texto_nivel = font.render(f"Nivel: {nivel}", True, (255, 255, 255))
        screen.blit(texto_puntos, (10, 50))
        screen.blit(texto_nivel, (10, 90))

        pygame.display.flip()
        clock.tick(60)  # Limitar a 60 FPS

    #Mostrar mensaje de Game Over
    pygame.mixer.music.stop()
    screen.fill((0, 0, 0))
    texto_game_over = font.render("GAME OVER", True, (255, 0, 0))
    texto_mensaje_final = font.render(f"Tu puntaje final es: {puntos}", True, (255, 255, 255))

    #Mostrar frase
    screen.blit(texto_game_over, (SCREEN_WIDTH // 2 - texto_game_over.get_width() // 2, SCREEN_HEIGHT // 2 - 50))
    screen.blit(texto_mensaje_final, (SCREEN_WIDTH // 2 - texto_mensaje_final.get_width() // 2, SCREEN_HEIGHT // 2 + 10))
    pygame.display.flip()
    pygame.time.wait(5000)  # Espera 5 segundos antes de cerrar

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
