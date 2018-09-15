"""User model"""
from sqlalchemy import Column, Integer, ForeignKey, DateTime, Enum
from datetime import datetime

from models.db import Model
from models.base_object import BaseObject
from models.footprint_type import FootprintType


class Footprint(BaseObject, Model):

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)

    date_created = Column(DateTime, nullable=False,  default=datetime.utcnow)

    type = Column(Enum(FootprintType))
    # TODO: add constraint to restrict list of possible values
    value = Column(Integer, nullable=False)

    carbon_footprint = Column(Integer, nullable=True)
    water_footprint = Column(Integer, nullable=True)
    waste_footprint = Column(Integer, nullable=True)

    def get_id(self):
        return str(self.id)

    def get_carbon_footprint(self):
        return str(self.carbon_footprint)

    def get_water_footprint(self):
        return str(self.water_footprint)

    def get_waste_footprint(self):
        return str(self.waste_footprint)

    def errors(self):
        errors = super(Footprint, self).errors()
        return errors
