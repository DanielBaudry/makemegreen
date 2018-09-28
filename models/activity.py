"""User model"""
from sqlalchemy import Column, Integer, BigInteger, ForeignKey, DateTime, Text, Boolean, Enum
from datetime import datetime

from models.db import Model, db
from models.base_object import BaseObject
import enum
from collections import OrderedDict


class ActivityStatus(enum.Enum):
    success = {'label': "succès"}
    fail = {'label': "échec"}
    pending = {'label': "en cours"}

    def _asdict(self):
        result = OrderedDict()
        result['label'] = self.name
        return result


class Activity(BaseObject, Model):

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)

    recommendation_id = Column(BigInteger, ForeignKey('recommendation.id'), nullable=False)
    recommendation = db.relationship('Recommendation', foreign_keys=[recommendation_id], backref='activity')

    date_start = Column(DateTime, nullable=False, default=datetime.utcnow())
    date_end = Column(DateTime, nullable=True)
    is_success = Column(Boolean, nullable=True)
    status = Column(Enum(ActivityStatus), nullable=False, default=ActivityStatus.pending)

    def get_id(self):
        return str(self.id)

    def get_benefit(self):
        return self.recommendation.get_benefit()

    def set_recommendation(self, recommendation_id):
        self.recommendation_id = recommendation_id

    def set_user(self, user_id):
        self.user_id = user_id

    def set_status(self, status):
        self.status = status

    def set_date_end(self):
        self.date_end = datetime.utcnow()

    def errors(self):
        errors = super(Activity, self).errors()
        return errors
