"""User model"""
from sqlalchemy import Column, Integer, DateTime, Text
from datetime import datetime

from models.db import Model
from models.base_object import BaseObject


class Property(BaseObject, Model):

    id = Column(Integer, primary_key=True)

    property_name = Column(Text, unique=True, nullable=False)

    date_created = Column(DateTime, nullable=False, default=datetime.utcnow())

    def get_id(self):
        return str(self.id)

    def errors(self):
        errors = super(Property, self).errors()
        return errors
