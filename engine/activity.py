""" Activity """
from models import BaseObject, Footprint, Users, Activity, ActivityStatus
from flask import current_app as app


class BadUserException(Exception):
    pass


class AlreadyStartedException(Exception):
    pass


class BadArgException(Exception):
    pass


class GetActivities:
    def __init__(self):
        pass

    def execute(self, user: Users) -> Activity:
        if user is None:
            raise BadUserException()
        activity = Activity.query.filter_by(user=user).all()

        return activity


class StartActivity:
    def __init__(self):
        pass

    def execute(self, recommendation_id, user_id) -> Activity:

        if recommendation_id is None:
            raise BadArgException()

        # TEST IF RECOMMENDATION ALREADY IN ACTIVITY FOR THE USER
        existing_activity = Activity.query.filter_by(user_id=user_id).filter_by(recommendation_id=recommendation_id).first()
        if existing_activity:
            raise AlreadyStartedException

        activity = Activity()
        activity.set_recommendation(recommendation_id)
        activity.set_user(user_id)

        BaseObject.check_and_save(activity)

        return activity


class EndActivity:
    def __init__(self):
        pass

    def execute(self, activity_id, user_id) -> Activity:

        if activity_id is None or user_id is None:
            raise BadArgException()

        activity = Activity.query.filter_by(id=activity_id).first()
        activity.set_status(ActivityStatus.fail)
        activity.set_date_end()

        BaseObject.check_and_save(activity)

        return activity


class ValidateActivity:
    def __init__(self):
        pass

    def execute(self, activity_id, user_id) -> Activity:

        if activity_id is None or user_id is None:
            raise BadArgException()

        # UPDATE ACTIVITY
        activity = Activity.query.filter_by(id=activity_id).first()
        activity.set_status(ActivityStatus.success)
        activity.set_date_end()

        # CREATE NEW : footprint
        footprint = Footprint.query.\
            filter_by(user_id=user_id).\
            filter_by(type=activity.recommendation.type). \
            order_by(Footprint.date_created.desc()). \
            first()

        app.logger.info(footprint.get_id())

        previous_value = footprint.get_value()
        new_footprint = Footprint(from_dict=footprint._asdict())
        new_footprint.set_value(previous_value - activity.recommendation.benefit)
        new_footprint.set_date_created()

        BaseObject.check_and_save(activity, new_footprint)

        return activity
