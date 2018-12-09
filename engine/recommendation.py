""" Activity """
import random

from models import BaseObject, User, Recommendation, UserProperty, Proposition, Property
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


        # Retrieve information on nb_users, nb_properties and nb_recommendations
        nb_users           = User.query.count()
        nb_properties      = Property.query.count()
        nb_recommendations = Recommendation.query.count()

        # TODO : these parts can be optimized by only selecting the properties/propositions (of every user)
        # TODO :  which has been answered by the user of interest!!!

        # distance with user properties
        all_userproperties = UserProperty.query.all()
        array_properties   = np.zeros([nb_users, nb_properties])

        for uprop in all_userproperties:
            array_properties[uprop.user_id - 1, uprop.property_id - 1] = uprop.value

        myuser_properties  = array_properties[user.id - 1]
        properties_nonzero = myuser_properties.nonzero()[0]
        norm_arrproperties = np.linalg.norm(array_properties[:, properties_nonzero], axis=1)
        dotproduct_ppties  = np.matmul(array_properties[:, properties_nonzero], myuser_properties[properties_nonzero])
        distances_ppties   = dotproduct_ppties/(norm_arrproperties * norm_arrproperties[user.id - 1])
        distances_ppties   = np.nan_to_num(distances_ppties)

        # distance with user recommendations
        all_userpropositions = Proposition.query.all()
        array_propositions   = np.zeros([nb_users, nb_recommendations])

        for uprop in all_userpropositions:
            array_propositions[uprop.user_id - 1, uprop.recommendation_id - 1] = uprop.state.value['value']

        myuser_propositions  = array_propositions[user.id - 1]
        propositions_nonzero = myuser_propositions.nonzero()[0]
        norm_arrpropositions = np.linalg.norm(array_propositions[:, propositions_nonzero], axis=1)
        dotproduct_proptions = np.matmul(array_propositions[:, propositions_nonzero], myuser_propositions[propositions_nonzero])
        distances_proptions  = dotproduct_proptions/(norm_arrpropositions * norm_arrpropositions[user.id - 1])
        distances_proptions  = np.nan_to_num(distances_proptions)

        # pooling both distances to obtain overall distance between users
        weight_ppties          = len(properties_nonzero)/nb_properties
        weight_proptions       = len(propositions_nonzero)/nb_recommendations
        sum_weights            = weight_ppties + weight_proptions
        distances              = distances_ppties * weight_ppties/sum_weights + distances_proptions * weight_proptions/sum_weights
        distances[user.id - 1] = 0 # set the user to same user distance to 0

        # use the distance and recommendations to obtain the propensity of the recommendation to be correct
        propensity = np.sum(array_propositions * np.expand_dims(distances, -1), axis=0)/np.sum(np.abs(distances))
        ## todo redo everything, problem here is that the 0 of the proposition is actually constraining
        ## todo if a person has answer "skipped", we should not offer him again this proposition before some time

        app.logger.info(distances)
        app.logger.info(propensity)
        app.logger.info(myuser_propositions)
        #  TODO: here we call the discover engine, it is ongoing
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



