from usuario import Usuario
from logger_base import log
from usuario_dao import UsuarioDAO
from psycopg2 import DatabaseError, IntegrityError

option = None

while option != 5:
    print("""
        Opciones: 
        1. Listar usuarios
        2. Agregar usuario
        3. Modificar usuario
        4. Eliminar usuario
        5. Salir
    """)
    try:
        option = int(input("Digite la opcion (1-5): "))

        if option == 1:
            usuarios = UsuarioDAO.seleccionar()
            for usuario in usuarios: 
                log.info(usuario)

        elif option == 2:
            new_user_name = input("Ingrese nombre de usuario: ").strip()
            new_user_pass = input("Digite su contrasenia: ").strip()
            
            if not new_user_name or not new_user_pass:
                log.warning("El usuario y la contraseña no pueden estar vacíos.")
                continue

            usuario = Usuario(username=new_user_name, password=new_user_pass)
            usuario_insertado = UsuarioDAO.insertar(usuario)
            log.info(f"Usuario insertado: {usuario_insertado}")

        elif option == 3:
            id_user = int(input("Digite el id del usuario a modificar: "))
            user_name = input("Ingrese el nuevo nombre de usuario: ")
            user_pass = input("Ingrese la nueva contrasenia: ")
            
            usuario = Usuario(id_user=id_user, username=user_name, password=user_pass)
            usuario_actualizado = UsuarioDAO.actualizar(usuario)
            if usuario_actualizado > 0:
                log.info(f"Usuario actualizado: {usuario_actualizado}")
            else:
                log.warning("No se encontró ningún usuario con ese ID.")

        elif option == 4:
            id_user = int(input("Ingrese el id del usuario a eliminar: "))
            usuario = Usuario(id_user=id_user)
            usuario_eliminado = UsuarioDAO.eliminar(usuario)
            if usuario_eliminado > 0:
                log.info(f"Usuario eliminado: {usuario_eliminado}")
            else:
                log.warning("No se encontró ningún usuario con ese ID.")
        elif option < 1 or option > 5:
            log.warning("Opción fuera de rango. Seleccione un número de 1 a 5.")

    except ValueError:
        log.error("Error: Debe ingresar un número entero válido.")

    except IntegrityError as e:
        log.error(f"Error de integridad en la BD (posible usuario duplicado): {e}")

    except DatabaseError as e:
        log.error(f"Error general en la base de datos: {e}")

    except KeyboardInterrupt:
        log.info("\nPrograma interrumpido por el usuario.")
        break

    except Exception as e:
        log.error(f"Ocurrió un error inesperado: {e}")

else:
    log.info("El usuario salió del menú.")