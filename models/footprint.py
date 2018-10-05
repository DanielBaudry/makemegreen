"""User model"""
from sqlalchemy import Column, Integer, ForeignKey, DateTime, Enum
from datetime import datetime

from models.db import Model
from models.base_object import BaseObject
from models.footprint_type import FootprintType


class Footprint(BaseObject, Model):

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)

    date_created = Column(DateTime, nullable=False, default=datetime.utcnow)

    type = Column(Enum(FootprintType))
    value = Column(Integer, nullable=False)

    # TODO: it is not ouf
    def populateFromDict(self, dct):
        super(Footprint, self).populateFromDict(dct)
        if dct.__contains__('value') and dct['value']:
            self.set_value(int(dct['value']))
        if dct.__contains__('type') and dct['type']:
            self.set_type(FootprintType(dct['type']))

    def get_id(self):
        return str(self.id)

    def get_carbon_footprint(self):
        return str(self.carbon_footprint)

    def get_water_footprint(self):
        return str(self.water_footprint)

    def get_waste_footprint(self):
        return str(self.waste_footprint)

    def set_value(self, value):
        self.value = value

    def set_type(self, type):
        self.type = type

    def set_date_created(self):
        self.date_created = datetime.utcnow()

    def get_value(self):
        return self.value

    def errors(self):
        errors = super(Footprint, self).errors()
        return errors
