""" install """
from sqlalchemy import orm
from sqlalchemy.exc import ProgrammingError

from models.db import db, Model

def install_models():
    db.create_all()
