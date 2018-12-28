"""users routes"""
from flask import current_app as app, jsonify
from flask_login import current_user, login_required
from models import Activity
from engine.activity import StartActivity, EndActivity, ValidateActivity, AlreadyStartedException, HoldActivity
from collections import OrderedDict
from utils.human_ids import dehumanize

from utils.includes import ACTIVITY_INCLUDES


@app.route("/activity/validate/<activity_id>", methods=["GET"])
@login_required
def validate_activity(activity_id):
    activity_id = dehumanize(activity_id)
    ValidateActivity().execute(activity_id=activity_id, user_id=int(current_user.get_id()))
    result = dict({"success": "yes"})

    return jsonify(result)


@app.route("/activity/hold/<activity_id>", methods=["GET"])
@login_required
def hold_activity(activity_id):
    activity_id = dehumanize(activity_id)
    HoldActivity().execute(activity_id=activity_id, user_id=int(current_user.get_id()))
    result = dict({"success": "yes"})

    return jsonify(result)


@app.route("/activity/remove/<activity_id>", methods=["GET"])
@login_required
def end_activity(activity_id):
    activity_id = dehumanize(activity_id)
    EndActivity().execute(activity_id=activity_id, user_id=int(current_user.get_id()))
    result = dict({"success": "yes"})

    return jsonify(result)


@app.route("/activity/<reco_id>", methods=["GET"])
@login_required
def start_activity(reco_id):
    try:
        recommendation_id = dehumanize(reco_id)
        StartActivity().execute(recommendation_id, int(current_user.get_id()))
    except AlreadyStartedException:
        return jsonify(dict({"status": "fail",
                       "message": "Cette recommendation est déjà en cours dans ton activité"})), 401
    result = dict({"status": "success",
                   "message": "Cette recommendation a bien été ajouté à ton activité"})

    return jsonify(result)


@app.route("/activities", methods=["GET"])
@login_required
def list_my_activity():
    query = Activity.query.filter_by(user_id=current_user.get_id())
    activities = query.all()
    result = OrderedDict()
    result['activities'] = _serialize_activities(activities)

    return jsonify(result), 200


def _serialize_activities(activities):
    return list(map(_serialize_activity, activities))


def _serialize_activity(activity):
    dict_activity = activity._asdict(include=ACTIVITY_INCLUDES)
    return dict_activity

