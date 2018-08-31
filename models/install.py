""" install """
from sqlalchemy import orm
from models.db import db


def install_models():
    orm.configure_mappers()
    db.create_all()
    db.session.commit()
