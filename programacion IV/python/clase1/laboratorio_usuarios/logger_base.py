import logging as log
import os

carpeta_actual = os.path.dirname(os.path.abspath(__file__))

# Ruta completa del archivo de log
ruta_log = os.path.join(carpeta_actual, "laboratorio_usuarios.log")

log.basicConfig(level=log.DEBUG,
                format='%(asctime)s:%(levelname)s [%(filename)s:%(lineno)s] %(message)s',
                datefmt='%I:%M:%S %p',
                handlers=[
                  log.FileHandler(ruta_log)
                ])