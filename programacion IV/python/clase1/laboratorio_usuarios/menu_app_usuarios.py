from usuario_dao import UsuarioDAO
from usuario import Usuario
continuar = True

while continuar:
  print("\n1. Listar usuarios")
  print("2. Agregar usuario")
  print("3. Actualizar usuario")
  print("4. Eliminar usuario")
  print("5. Salir")

  opcion = input("Seleccione una opción: ")
  print(f"Usted seleccionó la opción: {opcion}\n")

  match opcion:
    # Opcion 1 para listar usuarios
    case "1":
      print("Listando usuarios...")
      from usuario_dao import UsuarioDAO
      usuarios = UsuarioDAO.seleccionar()
      for usuario in usuarios:
        print(usuario)

    # Opcion 2 para agregar usuario
    case "2":
      print("Agregando usuario...")
      from usuario_dao import UsuarioDAO
      username = input("Ingrese el nombre del usuario: ")
      password = input("Ingrese la contraseña del usuario: ")
      usuario = Usuario(username=username, password=password)
      usuarios_insertados = UsuarioDAO.insertar(usuario)
      print(f"Usuarios insertados: {usuarios_insertados}")

    # Opcion 3 para actualizar usuario
    case "3":
      print("Actualizando usuario...")
      from usuario_dao import UsuarioDAO
      id_user = input("Ingrese el ID del usuario a actualizar: ")
      username = input("Ingrese el nuevo nombre del usuario: ")
      password = input("Ingrese la nueva contraseña del usuario: ")
      usuario = Usuario(id_user=id_user, username=username, password=password)
      usuarios_actualizados = UsuarioDAO.actualizar(usuario)
      print(f"Usuarios actualizados: {usuarios_actualizados}")

    # Opcion 4 para eliminar usuario
    case "4":
      print("Eliminando usuario...")
      from usuario_dao import UsuarioDAO
      id_user = input("Ingrese el ID del usuario a eliminar: ")
      usuario = Usuario(id_user=id_user)
      usuarios_eliminados = UsuarioDAO.eliminar(usuario)
      print(f"Usuarios eliminados: {usuarios_eliminados}")

    # Opcion 5 para salir
    case "5":
      continuar = False