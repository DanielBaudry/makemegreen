"""User model"""
from sqlalchemy import Column, Integer, ForeignKey, DateTime, Text, Enum, String
from datetime import datetime

from models.db import Model, db
from models.base_object import BaseObject
from models.footprint_type import FootprintType


class Recommendation(BaseObject, Model):

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    # activities = db.relationship('Activity', backref='recommendation', lazy=True)

    title = Column(String(60), nullable=False)
    content = Column(Text, nullable=True)
    estimated_success_time = Column(Integer, nullable=True)
    difficulty_level = Column(Integer, nullable=True)
    benefit = Column(Integer, nullable=True)
    # TODO: later maybe use tag_ids = many2many
    # TAG: id, name  [type (primary, secondary ?)]
    type = Column(Enum(FootprintType))

    date_created = Column(DateTime, nullable=False,  default=datetime.utcnow)

    def get_id(self):
        return str(self.id)

    def get_benefit(self):
        return self.benefit

    def errors(self):
        errors = super(Recommendation, self).errors()
        return errors
