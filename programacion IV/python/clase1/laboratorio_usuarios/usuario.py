class Usuario: 

    def __init__(self, id_user=None, username=None, password=None):
        self._id_user = id_user
        self._username = username
        self._password = password

    @property
    def id_user(self):
        return self._id_user

    @id_user.setter
    def id_user(self, id):
        self._id_user = id

    @property
    def username(self):
        return self._username

    @username.setter
    def username(self, name):
        self._username = name

    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, password):
        self._password = password

    def __str__(self):
        return f'''
            Id: {self.id_user}
            Username: {self.username}
            Password: {self.password}
            '''