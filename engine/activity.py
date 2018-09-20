""" Activity """
from models import BaseObject, Recommendation, User, Activity


class BadUserException(Exception):
    pass


class BadArgException(Exception):
    pass


class GetActivities:
    def __init__(self):
        pass

    def execute(self, user: User) -> Activity:
        if user is None:
            raise BadUserException()
        activity = Activity.query.filter_by(user=user).all()

        return activity


class StartActivity:
    def __init__(self):
        pass

    def execute(self, recommendation_id, user_id) -> Activity:
        print("TOTO: ")
        print(recommendation_id)
        print(user_id)
        print("============")

        if recommendation_id is None:
            raise BadArgException()

        activity = Activity()
        activity.set_recommendation(recommendation_id)
        activity.set_user(user_id)

        BaseObject.check_and_save(activity)

        return activity
