"""User model"""
from sqlalchemy import Column, Integer, BigInteger, ForeignKey, DateTime, Float
from datetime import datetime

from models.db import Model
from models.base_object import BaseObject


class RecommendationProperty(BaseObject, Model):

    id = Column(Integer, primary_key=True)

    recommendation_id = Column(BigInteger, ForeignKey('recommendation.id'), nullable=False)

    property_id = Column(BigInteger, ForeignKey('property.id'), nullable=False)

    coefficient = Column(Float, nullable=False)

    date_created = Column(DateTime, nullable=False, default=datetime.utcnow())

    def get_id(self):
        return str(self.id)

    def errors(self):
        errors = super(RecommendationProperty, self).errors()
        return errors
