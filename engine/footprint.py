""" Footprint """
from models import BaseObject, Footprint, User
from engine import dictionnary as info

class BadUserException(Exception):
    pass


class BadArgException(Exception):
    pass

class ComputeFootprint:
    def __init__(self):
        pass

    def getCO2Footprint(self, data):
        redmeatFootprint   = float(data[0].get('answer')) * info.dic['serving'] * info.dic['nb_meals'] * info.dic['red_meat']
        whitemeatFootprint = float(data[1].get('answer')) * info.dic['serving'] * info.dic['nb_meals'] * info.dic['white_meat']        
        clothesFootprint   = float(data[6].get('answer')) * info.dic['quantity_clothes'] * info.dic['cotton'] \
                                    + (1 - float(data[6].get('answer'))) * info.dic['quantity_clothes'] * info.dic['polyester/wool']
        trainFootprint     = float(data[7].get('answer')) * info.dic['train']
        if float(data[9].get('answer')) == -1:
            carFootprint       = float(data[8].get('answer')) * info.dic['car']
        else:
            carFootprint       = float(data[8].get('answer')) * float(data[9].get('answer'))/100. * info.dic['car_liter']
        carFootprint = carFootprint - carFootprint * float(data[10].get('answer')) * (info.dic['nb_passengers'] - 1.)/info.dic['nb_passengers']
        return redmeatFootprint + whitemeatFootprint + clothesFootprint + carFootprint

    def getTrashFootprint(self, data):
        greentrashFootprint  = float(data[2].get('answer')) * info.dic['green_trash']
        yellowtrashFootprint = float(data[3].get('answer')) * info.dic['yellow_trash']
        return greentrashFootprint + yellowtrashFootprint

    def getWaterFootprint(self, data):
        bathFootprint   = float(data[5].get('answer')) * float(data[4].get('answer')) * info.dic['bath']
        showerFootprint = float(data[5].get('answer')) * (1 - float(data[4].get('answer'))) * info.dic['shower'] * info.dic['time_shower']
        return bathFootprint + showerFootprint

    def execute(self, data):
        return dict({'carbon_footprint': self.getCO2Footprint(data),
                    'waste_footprint'  : self.getTrashFootprint(data),
                    'water_footprint'  : self.getWaterFootprint(data)})

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
