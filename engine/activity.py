""" Activity """
from flask import current_app as app
from datetime import datetime, timedelta

from sqlalchemy import func
from sqlalchemy.sql import label

from models import BaseObject, Footprint, User, Activity, ActivityStatus, Recommendation, FootprintType
from models.db import db


class BadUserException(Exception):
    pass


class AlreadyStartedException(Exception):
    pass


class BadArgException(Exception):
    pass


class GetActivityCount:
    def __init__(self):
        pass

    def execute(self, user: User) -> Activity:
        if user is None:
            raise BadUserException()
        activity_count = Activity.query.filter_by(user=user).count()
        # TODO: do we filter on the current week only ?
        # filter(Activity.date_end > beginning_of_the_week_date)

        return activity_count


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

        if recommendation_id is None:
            raise BadArgException()

        # TEST IF RECOMMENDATION ALREADY IN ACTIVITY FOR THE USER
        existing_activity = Activity.query. \
            filter_by(user_id=user_id). \
            filter_by(recommendation_id=recommendation_id).first()
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
        footprint = Footprint.query. \
            filter_by(user_id=user_id). \
            filter_by(type=activity.recommendation.type). \
            order_by(Footprint.date_created.desc()). \
            first()

        previous_value = footprint.get_value()
        new_footprint = Footprint(from_dict=footprint._asdict())
        new_footprint.set_value(previous_value - activity.recommendation.benefit)
        new_footprint.set_date_created()

        BaseObject.check_and_save(activity, new_footprint)

        return activity


class HoldActivity:
    def __init__(self):
        pass

    def execute(sel, activity_id, user_id) -> Activity:

        if activity_id is None or user_id is None:
            raise BadArgException()

        # UPDATE ACTIVITY
        activity = Activity.query.filter_by(id=activity_id).first()
        activity.set_status(ActivityStatus.pending)
        activity.set_date_end()

        # UPDATE : footprint
        footprint = Footprint.query. \
            filter_by(user_id=user_id). \
            filter_by(type=activity.recommendation.type). \
            order_by(Footprint.date_created.desc()). \
            first()

        previous_value = footprint.get_value()
        new_footprint = Footprint(from_dict=footprint._asdict())
        new_footprint.set_value(previous_value + activity.recommendation.benefit)
        new_footprint.set_date_created()

        BaseObject.check_and_save(activity, new_footprint)

        return activity

class GetWeeklyProgress:
    def __init__(self):
        pass

    def execute(self, user: User) -> dict:
        if user is None:
            raise BadUserException()

        today = datetime.now().date()
        beginning_of_the_week_date = today - timedelta(days=today.weekday())

        activities = db.session.query(Recommendation.type,
                                      func.sum(Recommendation.benefit).label("value")). \
            join(Activity, Recommendation.id == Activity.recommendation_id). \
            filter(Activity.user == user). \
            filter(Activity.date_end > beginning_of_the_week_date). \
            filter((Activity.status == ActivityStatus.success)
                   | (Activity.status == ActivityStatus.fail)). \
            group_by(Recommendation.type). \
            all()

        result = list()
        index = 0
        # We need to do that because .label does not seems to work
        for activity in activities:
            tmp_obj = dict()
            tmp_obj['id'] = index
            tmp_obj['type'] = activity[0]
            tmp_obj['value'] = activity[1]
            result.append(tmp_obj)
            index += 1

        # Not really beautiful ...
        for type in FootprintType:
            footprint_type = type.value.get('label')
            if footprint_type != "total":
                label_is_present = False
                for obj in result:
                    if obj['type'] == type:
                        label_is_present = True
                        break
                if not label_is_present:
                    tmp_obj = dict()
                    tmp_obj['id'] = index
                    tmp_obj['type'] = type
                    tmp_obj['value'] = 0
                    result.append(tmp_obj)
                    index += 1

        result = sorted(result, key=lambda k: k['type'].value.get('label'))

        return result
