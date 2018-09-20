"""User model"""
from sqlalchemy import Column, Integer, ForeignKey, DateTime, Text, Boolean
from datetime import datetime

from models.db import Model, db
from models.base_object import BaseObject


class Activity(BaseObject, Model):

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    recommendation_id = Column(Integer, ForeignKey('recommendation.id'), nullable=False)
    date_start = Column(DateTime, nullable=False, default=datetime.utcnow())
    date_end = Column(DateTime, nullable=True)
    is_success = Column(Boolean, nullable=True)

    def get_id(self):
        return str(self.id)

    def set_recommendation(self, recommendation_id):
        self.recommendation_id = recommendation_id

    def set_user(self, user_id):
        self.user_id = user_id

    def errors(self):
        errors = super(Activity, self).errors()
        return errors
