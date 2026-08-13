from usuario import Usuario
from cursor_del_pool import CursorDelPool
from logger_base import log

class UsuarioDAO:
  """
  DAO significa: Data Access Object
  CRUD significa:
                  Create -> Insertar
                  Select -> Seleccionar
                  Update -> Actualizar
                  Delete -> Eliminar
  """
  _SELECCIONAR = "SELECT * FROM usuario ORDER BY id_user"
  _INSERTAR = "INSERT INTO usuario(username, password) VALUES (%s, %s)"
  _ACTUALIZAR = "UPDATE usuario SET username=%s, password=%s WHERE id_user=%s"
  _ELIMINAR = "DELETE FROM usuario WHERE id_user=%s"

  # Definimos los métodos de clase
  @classmethod
  def seleccionar(cls):
    with CursorDelPool() as cursor:
      cursor.execute(cls._SELECCIONAR)
      registros = cursor.fetchall()
      usuarios = [] # creamos una lista
      for registro in registros:
        usuario = Usuario(registro[0], registro[1], registro[2])
        usuarios.append(usuario)
      return usuarios
  
  @classmethod
  def insertar(cls, usuario):
    with CursorDelPool() as cursor:
      valores = (usuario.username, usuario.password)
      cursor.execute(cls._INSERTAR, valores)
      log.debug(f'Usuario Insertada: {usuario}')
      return cursor.rowcount

  @classmethod
  def actualizar(cls, usuario):
    with CursorDelPool() as cursor:
      valores = (usuario.username, usuario.password, usuario.id_user)
      cursor.execute(cls._ACTUALIZAR, valores)
      log.debug(f'Usuario actualizada: {usuario}')
      return cursor.rowcount

  @classmethod
  def eliminar(cls, usuario):
    with CursorDelPool() as cursor:
      valores = (usuario.id_user,)
      cursor.execute(cls._ELIMINAR, valores)
      log.debug(f'Los objetos eliminados son: {usuario}')
      return cursor.rowcount