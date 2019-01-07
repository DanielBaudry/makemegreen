""" Activity """
import random

from models import BaseObject, User, Recommendation, UserProperty, Proposition, Property
from flask import current_app as app
import numpy as np
from datetime import datetime
from models.db import db
from sqlalchemy import func
from engine.ml_modules.ensemble_model import ensemble_model
from engine.ml_modules.modules.container import container

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
        possible_recommendations = np.array(query.all())


        # Retrieve information from database
        nb_users             = User.query.count()
        nb_properties        = Property.query.count()
        nb_recommendations   = Recommendation.query.count()
        all_userproperties   = UserProperty.query.with_entities(UserProperty.id, UserProperty.user_id,\
                                                                UserProperty.property_id, UserProperty.value).all()
        all_userpropositions = Proposition.query.with_entities(Proposition.id, Proposition.user_id, \
                                                                Proposition.recommendation_id, Proposition.state, \
                                                                Proposition.date_write).all()
        freq_recommendations = Recommendation.query.with_entities(Recommendation.id, \
                                                func.count(Proposition.recommendation_id)). \
                                                join(Proposition, Recommendation.id == Proposition.recommendation_id).\
                                                group_by(Recommendation.id).\
                                                order_by(Recommendation.id).all()
        recommendations     = Recommendation.query.all()

        # convert to numpy arrays
        # user properties
        arr_ppties   = np.zeros([nb_users, nb_properties])
        for uprop in all_userproperties:
            arr_ppties[uprop.user_id - 1, uprop.property_id - 1] = uprop.value

        # user propositions
        arr_pptions     = np.zeros([nb_users, nb_recommendations])
        myuser_dates    = np.ones(nb_recommendations, dtype=object) # initialized far in the past
        myuser_dates[:] = datetime(2016, 1, 1)
        for uprop in all_userpropositions:
            arr_pptions[uprop.user_id - 1, uprop.recommendation_id - 1] = uprop.state.value['value']
            if uprop.user_id == user.id and uprop.state.value['value'] == 0:
                myuser_dates[uprop.recommendation_id - 1] = uprop.date_write

        # recommendation frequency
        freq_recommendations = np.array(freq_recommendations)[:,1]
        impact_recommend     = np.zeros(nb_recommendations)
        for rec in recommendations:
            impact_recommend[rec.id - 1] = rec.benefit

        # launch algorithm for suggesting propositions
        label ='propositions'
        data  = container(arr_ppties, arr_pptions, user.id - 1, label) # python indexes starts at 0, thus the user.id - 1
        type_ = 'memory_based' # type of model used
        model = ensemble_model(data, type_, myuser_dates=myuser_dates, freq_recomm=freq_recommendations, recomm_impact=impact_recommend)

        result_model = model.sample()
        if result_model is not False:
            possible_recommendations = [recommendations[result_model[i]] for i in range(len(result_model))]
        else:
            random.shuffle(possible_recommendations)

        #app.logger.info(possible_recommendations)

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



