"""User model"""
import enum
from collections import OrderedDict

from sqlalchemy import Column, Integer, ForeignKey, DateTime, Enum, BigInteger, Float
from datetime import datetime

from models.db import Model, db
from models.base_object import BaseObject


class PropositionStatus(enum.Enum):
    accepted = {
        'label': "acceptée",
        'value': 1
    }
    refused = {
        'label': "refusée",
        'value': -1
    }
    skipped = {
        'label': "passée",
        'value': 0
    }

    def _asdict(self):
        result = OrderedDict()
        result['label'] = self.name
        return result


class Proposition(BaseObject, Model):

    id = Column(Integer, primary_key=True)

    user_id = Column(BigInteger, ForeignKey('user.id'), nullable=False)
    recommendation_id = Column(BigInteger, ForeignKey('recommendation.id'), nullable=False)

    probability = Column(Float, nullable=False)

    state = Column(Enum(PropositionStatus), nullable=True)

    date_write = Column(DateTime, nullable=True)

    date_created = Column(DateTime, nullable=False,  default=datetime.utcnow)

    def get_id(self):
        return str(self.id)

    def errors(self):
        errors = super(Proposition, self).errors()
        return errors
