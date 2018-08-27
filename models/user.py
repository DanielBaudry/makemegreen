"""User model"""
from datetime import datetime
from sqlalchemy import Binary, Column, DateTime, String
import bcrypt

from models.db import Model
from models.base_object import BaseObject


class User(BaseObject,
           Model):

    email = Column(String(120), nullable=False, unique=True)
    password = Column(Binary(60), nullable=False)

    dateCreated = Column(DateTime,
                         nullable=False,
                         default=datetime.utcnow)

    clearTextPassword = None

    def checkPassword(self, passwordToCheck):
        return bcrypt.hashpw(passwordToCheck.encode('utf-8'), self.password) == self.password

    def errors(self):
        errors = super(User, self).errors()
        if self.id is None\
           and User.query.filter_by(email=self.email).count()>0:
            errors.addError('email', 'Un compte lie a cet email existe deja')
        if self.email:
            errors.checkEmail('email', self.email)
        if self.clearTextPassword:
            errors.checkMinLength('password', self.clearTextPassword, 8)
        return errors

    def get_id(self):
        return str(self.id)

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def setPassword(self, newpass):
        self.clearTextPassword = newpass
        self.password = bcrypt.hashpw(newpass.encode('utf-8'),
                                      bcrypt.gensalt())

