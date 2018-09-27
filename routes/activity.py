"""users routes"""
from flask import current_app as app, jsonify, request
from flask_login import current_user, login_required
from models import Activity, ActivityStatus
from engine.activity import StartActivity, EndActivity
from collections import OrderedDict

from utils.includes import ACTIVITY_INCLUDES


@app.route("/activity/remove/<activity_id>", methods=["GET"])
@login_required
def end_activity(activity_id):
    activity = EndActivity().execute(activity_id=int(activity_id), user_id=int(current_user.get_id()))
    app.logger.info(activity)
    result = dict({"success": "yes"})

    return jsonify(result)


# TODO: login_required or not for GET and list methods?

@app.route("/activity/<reco_id>", methods=["GET"])
@login_required
def start_activity(reco_id):
    app.logger.info("Start new activity based on specific recommendation")
    activity = StartActivity().execute(int(reco_id), int(current_user.get_id()))
    app.logger.info(activity)
    result = dict({"success": "yes"})

    return jsonify(result)


@app.route("/activities", methods=["GET"])
@login_required
def list_my_activity():
    query = Activity.query.filter_by(user_id=current_user.get_id()).filter_by(status=ActivityStatus.pending)
    activities = query.all()
    result = OrderedDict()
    result['activities'] = _serialize_activities(activities)

    return jsonify(result), 200


def _serialize_activities(activities):
    return list(map(_serialize_activity, activities))


def _serialize_activity(activity):
    dict_activity = activity._asdict(include=ACTIVITY_INCLUDES)
    return dict_activity

