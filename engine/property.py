""" Property """
from models import BaseObject, Property, UserProperty


class BadUserException(Exception):
    pass


class AlreadyStartedException(Exception):
    pass


class BadArgException(Exception):
    pass


class GetUserProperties:
    def __init__(self):
        pass

    def execute(self, user_id: int) -> dict:
        properties = Property.query.all()
        obj = dict()
        for property_obj in properties:
            user_answers = UserProperty.query. \
                filter_by(user_id=user_id). \
                filter_by(property_id=property_obj.id). \
                first()
            obj[property_obj.property_name] = user_answers.value if user_answers is not None else False
        return obj


class SaveUserProperties:
    def __init__(self):
        pass

    def execute(self, data: dict, user_id: int):
        object_to_save = []
        for key, value in data.items():
            property_obj = Property.query.filter_by(property_name=key).first()
            if property_obj is not None\
                    and value != "":
                user_property_obj = UserProperty.query.\
                    filter_by(user_id=user_id).\
                    filter_by(property_id=property_obj.id).\
                    first()
                if user_property_obj is None:
                    user_property = UserProperty()
                    user_property.user_id = user_id
                    user_property.property_id = property_obj.id
                    user_property.value = float(value)
                    object_to_save.append(user_property)
                else:
                    user_property_obj.value = float(value)
                    object_to_save.append(user_property_obj)

        BaseObject.check_and_save(*object_to_save)
