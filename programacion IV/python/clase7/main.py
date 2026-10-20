import pygame
import sys
import random

import recursos
from personaje import Personaje, Enemigo, Explosion
from constantes import (
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    ENEMIGO_VELOCIDAD,
    ENEMIGO_VELOCIDAD_POR_NIVEL,
    ENEMIGO_SPAWN_FRAMES,
    ENEMIGO_SPAWN_POR_NIVEL,
    ENEMIGO_SPAWN_MINIMO,
    LASER_COOLDOWN,
    PUNTOS_POR_NIVEL,
)


def salir():
    pygame.quit()
    sys.exit()


def escalar_manteniendo_proporcion(imagen, ancho_max, alto_max):
    """Escala la imagen sin deformarla, para que quepa en el espacio dado."""
    ancho, alto = imagen.get_size()
    factor = min(ancho_max / ancho, alto_max / alto)
    return pygame.transform.scale(imagen, (int(ancho * factor), int(alto * factor)))


def mostrar_imagen_inicial(screen, nombre_imagen, duracion):
    """Muestra una imagen centrada que se va desvaneciendo."""
    imagen = recursos.cargar_imagen(nombre_imagen)
    imagen = escalar_manteniendo_proporcion(imagen, SCREEN_WIDTH * 0.6, SCREEN_HEIGHT * 0.6)
    posicion = imagen.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2))

    clock = pygame.time.Clock()
    tiempo_inicial = pygame.time.get_ticks()
    tiempo_total = duracion  # Duracion en milisegundos

    while pygame.time.get_ticks() - tiempo_inicial < tiempo_total:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                salir()
            # Permitir saltear la intro con cualquier tecla
            if event.type == pygame.KEYDOWN:
                return

        # Calcular el tiempo transcurrido y el alpha correspondiente
        tiempo_transcurrido = pygame.time.get_ticks() - tiempo_inicial
        alpha = max(0, 255 - (255 * tiempo_transcurrido / tiempo_total))

        # Establecer transparencia y dibujar la imagen
        imagen.set_alpha(alpha)
        screen.fill((0, 0, 0))  # Limpiar la pantalla
        screen.blit(imagen, posicion)
        pygame.display.flip()

        clock.tick(60)  # Limitar a 60 FPS


def texto_centrado(screen, font, texto, dy, color=(255, 255, 255)):
    """Dibuja una linea de texto centrada horizontalmente."""
    render = font.render(texto, True, color)
    screen.blit(render, (SCREEN_WIDTH // 2 - render.get_width() // 2, SCREEN_HEIGHT // 2 + dy))


def dibujar_pausa(screen, font):
    """Oscurece la pantalla y muestra el cartel de pausa."""
    velo = pygame.Surface((SCREEN_WIDTH, SCREEN_HEIGHT))
    velo.set_alpha(160)
    velo.fill((0, 0, 0))
    screen.blit(velo, (0, 0))

    texto_centrado(screen, font, "PAUSA", -40)
    texto_centrado(screen, font, "P para seguir jugando", 10)
    pygame.display.flip()


def jugar(screen, font, fondos):
    """Corre una partida completa. Devuelve los puntos finales."""
    fondo2, fondo3 = fondos

    sonido_laser = recursos.cargar_sonido('laserdis.mp3')
    sonido_explosion = recursos.cargar_sonido('explosion.mp3')

    personaje = Personaje(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)
    enemigos = []
    explosiones = []
    puntos = 0
    cooldown_laser = 0  # frames que faltan para poder disparar de nuevo
    contador_spawn = 0  # frames desde que aparecio el ultimo enemigo
    pausado = False

    clock = pygame.time.Clock()
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                salir()
            if event.type == pygame.KEYDOWN and event.key == pygame.K_p:
                pausado = not pausado
                if pausado:
                    pygame.mixer.music.pause()
                else:
                    pygame.mixer.music.unpause()

        if pausado:
            dibujar_pausa(screen, font)
            clock.tick(60)
            continue

        # Nivel actual y fondo asociado
        nivel = puntos // PUNTOS_POR_NIVEL + 1
        fondo_actual = fondo2 if nivel % 2 == 1 else fondo3

        # Movimiento con las flechas
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
        personaje.actualizar()

        if cooldown_laser > 0:
            cooldown_laser -= 1

        if keys[pygame.K_SPACE] and cooldown_laser == 0:
            personaje.lanzar_laser()
            sonido_laser.play()
            cooldown_laser = LASER_COOLDOWN  # espera unos frames entre disparos

        # Actualizar enemigos y verificar colisiones
        for enemigo in enemigos[:]:
            enemigo.mover()
            if enemigo.rect.top > SCREEN_HEIGHT:
                enemigos.remove(enemigo)
                continue

            # Verificar colision con laser
            destruido = False
            for laser in personaje.lasers[:]:
                if enemigo.rect.colliderect(laser.rect):
                    explosiones.append(Explosion(enemigo.rect.centerx, enemigo.rect.centery))
                    enemigos.remove(enemigo)  # Elimina el enemigo
                    personaje.lasers.remove(laser)  # Elimina el laser
                    sonido_explosion.play()
                    puntos += 10  # Incrementa los puntos por cada enemigo destruido
                    destruido = True
                    break  # Sale del bucle

            if destruido:
                continue

            # Verificar colision con el personaje. Si esta invulnerable, el
            # enemigo le pasa por encima sin hacerle nada.
            if enemigo.rect.colliderect(personaje.shape) and personaje.invulnerable == 0:
                explosiones.append(Explosion(enemigo.rect.centerx, enemigo.rect.centery))
                enemigos.remove(enemigo)
                sonido_explosion.play()
                if not personaje.recibir_dano():
                    running = False  # Termina el juego si la energia llega a 0

        # Generar un enemigo cada cierta cantidad de frames (mas seguido en niveles altos)
        espera_spawn = max(
            ENEMIGO_SPAWN_MINIMO,
            ENEMIGO_SPAWN_FRAMES - (nivel - 1) * ENEMIGO_SPAWN_POR_NIVEL,
        )
        contador_spawn += 1
        if contador_spawn >= espera_spawn:
            contador_spawn = 0
            # Nos asegura tener al enemigo dentro de la pantalla
            x = random.randint(0, SCREEN_WIDTH - 95)
            velocidad = ENEMIGO_VELOCIDAD + (nivel - 1) * ENEMIGO_VELOCIDAD_POR_NIVEL
            enemigos.append(Enemigo(x, -95, velocidad))

        # Actualizar explosiones
        explosiones = [explosion for explosion in explosiones if explosion.actualizar()]

        # Dibujar el fondo y los objetos en la pantalla
        screen.blit(fondo_actual, (0, 0))
        personaje.dibujar(screen)

        for enemigo in enemigos:
            enemigo.dibujar(screen)

        for explosion in explosiones:
            explosion.dibujar(screen)

        # Mostrar el marcador y el nivel
        screen.blit(font.render(f"Puntos: {puntos}", True, (255, 255, 255)), (10, 50))
        screen.blit(font.render(f"Nivel: {nivel}", True, (255, 255, 255)), (10, 90))

        pygame.display.flip()
        clock.tick(60)  # Limitar a 60 FPS

    return puntos


def pantalla_game_over(screen, font, puntos, record):
    """Muestra el Game Over. Devuelve True si el jugador quiere otra partida."""
    pygame.mixer.music.stop()

    screen.fill((0, 0, 0))
    texto_centrado(screen, font, "GAME OVER", -80, (255, 0, 0))
    texto_centrado(screen, font, f"Tu puntaje final es: {puntos}", -20)
    texto_centrado(screen, font, f"Record de la sesion: {record}", 20)
    texto_centrado(screen, font, "ENTER para jugar de nuevo", 80)
    texto_centrado(screen, font, "ESC para salir", 120)
    pygame.display.flip()

    clock = pygame.time.Clock()
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                salir()
            if event.type == pygame.KEYDOWN:
                if event.key in (pygame.K_RETURN, pygame.K_KP_ENTER):
                    return True
                if event.key == pygame.K_ESCAPE:
                    return False
        clock.tick(60)


def main():
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    pygame.display.set_caption("Amenaza Fantasma")

    pygame.display.set_icon(recursos.cargar_imagen('001.jfif'))

    # Pantalla de inicio (se puede saltear con cualquier tecla)
    mostrar_imagen_inicial(screen, 'inicio/cachoneta.png', 3000)

    # Cargar todas las imagenes y sonidos de la partida de una sola vez
    recursos.precargar()

    # Inicializar los fondos
    fondo2 = recursos.cargar_imagen('fondo2.jfif', (SCREEN_WIDTH, SCREEN_HEIGHT), con_alpha=False)
    fondo3 = recursos.cargar_imagen('fondo3.jpg', (SCREEN_WIDTH, SCREEN_HEIGHT), con_alpha=False)

    font = pygame.font.Font(None, 36)
    record = 0

    while True:
        # Reproducir musica de fondo en bucle
        recursos.reproducir_musica('efectos.mp3')

        puntos = jugar(screen, font, (fondo2, fondo3))
        record = max(record, puntos)

        if not pantalla_game_over(screen, font, puntos, record):
            break

    salir()


if __name__ == "__main__":
    main()
