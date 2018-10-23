""" Activity """
from models import BaseObject, User, Recommendation


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

    def execute(self, user: User, reco_already_attach_to_user: [Recommendation]) -> [Recommendation]:
        if user is None:
            raise BadUserException()

        query = Recommendation.query. \
            filter(Recommendation.id.notin_(reco_already_attach_to_user))
        possible_recommendations = query.all()

        #  TODO: here we call the discover engine

        return possible_recommendations



