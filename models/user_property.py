"""User model"""
from sqlalchemy import Column, Integer, BigInteger, ForeignKey, DateTime, Float
from datetime import datetime

from models.db import Model
from models.base_object import BaseObject


class UserProperty(BaseObject, Model):

    id = Column(Integer, primary_key=True)
    user_id = Column(BigInteger, ForeignKey('user.id'), nullable=False)

    property_id = Column(BigInteger, ForeignKey('property.id'), nullable=False)

    value = Column(Float, nullable=False)

    date_created = Column(DateTime, nullable=False, default=datetime.utcnow())

    def get_id(self):
        return str(self.id)

    def errors(self):
        errors = super(UserProperty, self).errors()
        return errors
