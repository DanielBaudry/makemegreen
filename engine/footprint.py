""" Footprint """
from models import BaseObject, Footprint, User, FootprintType
from engine import dictionnary as info
from flask import current_app as app

class BadUserException(Exception):
    pass


class BadArgException(Exception):
    pass


class ComputeFootprint:
    def __init__(self):
        pass

    def getCO2Footprint(self, data):

        redmeatFootprint = float(data.get('red_meat_frequency')) * info.dic['serving'] * info.dic['nb_meals'] * info.dic['red_meat']
        whitemeatFootprint = float(data.get('white_meat_frequency')) * info.dic['serving'] * info.dic['nb_meals'] * info.dic['white_meat']
        clothesFootprint = float(data.get('clothes_composition')) * info.dic['quantity_clothes'] * info.dic['cotton'] \
                                    + (1 - float(data.get('clothes_composition'))) * info.dic['quantity_clothes'] * info.dic['polyester/wool']
        trainFootprint = float(data.get('train_frequency')) * info.dic['train']
        if float(data.get('personal_vehicule_consumption')) == -1:
            carFootprint = float(data.get('personal_vehicule_frequency')) * info.dic['car']
        else:
            carFootprint = float(data.get('personal_vehicule_frequency')) * float(data.get('personal_vehicule_consumption'))/100. * info.dic['car_liter']
        carFootprint = carFootprint - carFootprint * float(data.get('carpooling_frequency')) * (info.dic['nb_passengers'] - 1.)/info.dic['nb_passengers']
        return redmeatFootprint + whitemeatFootprint + clothesFootprint + carFootprint

    def getTrashFootprint(self, data):
        greentrashFootprint = float(data.get('green_garbage')) * info.dic['green_trash']
        yellowtrashFootprint = float(data.get('yellow_garbage')) * info.dic['yellow_trash']
        return greentrashFootprint + yellowtrashFootprint

    def getWaterFootprint(self, data):
        bathFootprint = float(data.get('bath_shower_frequency')) * float(data.get('bath_or_shower')) * info.dic['bath']
        showerFootprint = float(data.get('bath_shower_frequency')) * (1 - float(data.get('bath_or_shower'))) * info.dic['shower'] * info.dic['time_shower']
        return bathFootprint + showerFootprint

    def execute(self, data):

        return [
                {
                    "id": 1,
                    "type": {
                        "label": "carbon"
                    },
                    "value": self.getCO2Footprint(data)
                },
                {
                    "id": 2,
                    "type": {
                        "label": "waste"
                    },
                    "value": self.getTrashFootprint(data)
                },
                {
                    "id": 3,
                    "type": {
                        "label": "water"
                    },
                    "value": self.getWaterFootprint(data)
                }
        ]


class GetFootprintHistory:
    def __init__(self):
        pass

    def execute(self, user: User) -> Footprint:
        if user is None:
            raise BadUserException()

        footprints = []
        for type in FootprintType:
            footprint_type = type.value.get('label')
            if footprint_type != "total":
                footprint = Footprint.query. \
                    filter_by(user_id=user.get_id()). \
                    filter_by(type=footprint_type). \
                    order_by(Footprint.date_created.asc()). \
                    all()

                footprints.append(footprint)

        return footprints


class GetFootprints:
    def __init__(self):
        pass

    def execute(self, user: User) -> Footprint:
        if user is None:
            raise BadUserException()

        footprints = []
        for type in FootprintType:
            footprint_type = type.value.get('label')
            if footprint_type != "total":
                footprint = Footprint.query. \
                    filter_by(user_id=user.get_id()). \
                    filter_by(type=footprint_type). \
                    order_by(Footprint.date_created.desc()). \
                    first()

                footprints.append(footprint)

        return footprints


class SaveFootprint:
    def __init__(self, footprint: Footprint):
        self.footprint = Footprint

    def execute(self, footprint: Footprint) -> Footprint:
        if footprint is None:
            raise BadArgException()

        BaseObject.check_and_save(footprint)

        return footprint
