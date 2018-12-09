""" Activity """
import random

from models import BaseObject, User, Recommendation, UserProperty
from flask import current_app as app
import numpy as np
from models.db import db
from sqlalchemy import func

class BadUserException(Exception):
    pass


class AlreadyStartedException(Exception):
    pass


class BadArgException(Exception):
    pass


class AddRecommendation:
    def __init__(self):
        pass

    def execute(self, user: User, data) -> Recommendation:
        if user is None:
            raise BadUserException()

        if data is None:
            raise BadArgException

        recommendation = Recommendation()
        recommendation.user_id = user.id
        recommendation.title = data.get('title')
        recommendation.content = data.get('content')
        recommendation.estimated_success_time = data.get('estimated_success_time')
        recommendation.difficulty_level = data.get('difficulty_level')
        recommendation.benefit = data.get('benefit')
        recommendation.type = data.get('type')

        BaseObject.check_and_save(recommendation)

        return recommendation


class DiscoverNewRecommendations:
    def __init__(self):
        pass

    def execute(self, user: User, reco_already_attach_to_user: [Recommendation]) -> list:
        if user is None:
            raise BadUserException()

        query = Recommendation.query. \
            filter(Recommendation.id.notin_(reco_already_attach_to_user))
        possible_recommendations = query.all()


        all_userproperties = UserProperty.query.order_by(UserProperty.user_id).all()
        nb_users           = len(UserProperty.query.with_entities(UserProperty.user_id).group_by(UserProperty.user_id).all())
        nb_properties      = len(UserProperty.query.with_entities(UserProperty.property_id).group_by(UserProperty.property_id).all())
        # TODO : this last part can be optimized by only selecting the properties (of every user) which has been answered
        # TODO : by the user of interest!!!

        array_properties = np.zeros([nb_users, nb_properties])

        for uprop in all_userproperties:
            array_properties[uprop.user_id - 1, uprop.property_id - 1] = uprop.value

        myuser_properties = array_properties[user.id - 1]
        indexes_nonzero   = myuser_properties.nonzero()[0]
        norm_arrayppties  = np.linalg.norm(array_properties[:, indexes_nonzero], axis=1)
        dotproduct_ppties = np.matmul(array_properties[:, indexes_nonzero], myuser_properties[indexes_nonzero])
        distances         = dotproduct_ppties/(norm_arrayppties * norm_arrayppties[user.id - 1])
        app.logger.info(distances)

        #  TODO: here we call the discover engine
        random.shuffle(possible_recommendations)

        result = list()
        first = True
        for reco in possible_recommendations:
            tmp_obj = dict(reco._asdict())
            if first:
                tmp_obj['first'] = True
                first = False
            else:
                tmp_obj['first'] = False
            result.append(tmp_obj)

        return result



