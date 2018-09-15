"""User model"""
from sqlalchemy import Column, Integer, ForeignKey, DateTime, Text
from datetime import datetime

from models.db import Model, db
from models.base_object import BaseObject


class Progress(BaseObject, Model):

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    score = Column(Integer, ForeignKey('recommendation.id'), nullable=False)
    dateCreated = Column(DateTime,
                          nullable=False,
                          default=datetime.utcnow)

    def get_id(self):
        return str(self.id)

    def errors(self):
        errors = super(Progress, self).errors()
        return errors
