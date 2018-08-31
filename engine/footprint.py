""" Footprint """
from models import BaseObject, Footprint, User


class BadUserException(Exception):
    pass


class BadArgException(Exception):
    pass


class GetFootprint:
    def __init__(self):
        pass

    def execute(self, user: User) -> Footprint:
        if user is None:
            raise BadUserException()
        footprint = Footprint.query.filter_by(user=user).first()

        return footprint


class SaveFootprint:
    def __init__(self, footprint: Footprint):
        self.footprint = Footprint

    def execute(self, footprint: Footprint) -> Footprint:
        if footprint is None:
            raise BadArgException()

        BaseObject.check_and_save(footprint)

        return footprint
