"""User model"""
from datetime import datetime
from sqlalchemy import Column, DateTime
import bcrypt

from models.db import Model, db
from models.base_object import BaseObject


class Users(BaseObject, Model):
    id = Column(db.Integer, primary_key=True)
    email = Column(db.String(80), unique=True, nullable=False)
    password = Column(db.Binary(60), nullable=False)
    username = Column(db.String(80), nullable=False)

    footprints = db.relationship('Footprint', backref='users', lazy=True)
    activities = db.relationship('Activity', backref='users', lazy=True)

    dateCreated = Column(DateTime,
                         nullable=False,
                         default=datetime.utcnow)

    clearTextPassword = None

    def populateFromDict(self, dct):
        super(Users, self).populateFromDict(dct)
        if dct.__contains__('password') and dct['password']:
            self.setPassword(dct['password'])

    def checkPassword(self, passwordToCheck):
        return bcrypt.hashpw(passwordToCheck.encode('utf-8'), self.password) == self.password

    def errors(self):
        errors = super(Users, self).errors()
        if self.id is None\
           and Users.query.filter_by(email=self.email).count()>0:
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

    def is_anonymous(self):
        return False

    def setPassword(self, newpass):
        self.clearTextPassword = newpass
        self.password = bcrypt.hashpw(newpass.encode('utf-8'),
                                      bcrypt.gensalt())

