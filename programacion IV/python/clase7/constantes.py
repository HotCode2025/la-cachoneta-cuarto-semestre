import os

# Dimension en la pantalla, el alto y el ancho de la pantalla
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600

# Especificamos los colores en la pantalla

COLOR_LASER = (0,0,255) #azul
COLOR_PANTALLA = (0,0,0) #negro

# Ruta a la carpeta assets
ASSETS_PATH = os.path.join(os.path.dirname(__file__), 'assets')

# Parametros de dificultad (toca estos numeros para balancear el juego)
ENEMIGO_VELOCIDAD = 2.0           # pixeles por frame en el nivel 1
ENEMIGO_VELOCIDAD_POR_NIVEL = 0.4 # cuanto mas rapido va cada nivel
ENEMIGO_SPAWN_FRAMES = 45         # un enemigo cada 45 frames (0.75 s) en el nivel 1
ENEMIGO_SPAWN_POR_NIVEL = 5       # cuantos frames menos de espera cada nivel
ENEMIGO_SPAWN_MINIMO = 15         # lo mas seguido que pueden aparecer (0.25 s)
LASER_COOLDOWN = 10               # frames de espera entre disparos
PUNTOS_POR_NIVEL = 250            # puntos necesarios para subir de nivel
INVULNERABLE_FRAMES = 60          # 1 segundo de inmunidad despues de un golpe
PARPADEO_FRAMES = 4               # cada cuantos frames alterna el parpadeo
