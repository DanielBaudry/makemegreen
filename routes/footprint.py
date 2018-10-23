"""users routes"""
import operator
from collections import OrderedDict

from flask import current_app as app, jsonify, request
from flask_login import current_user, login_required
from engine.footprint import GetFootprints, ComputeFootprint, GetFootprintHistory
from engine.activity import GetActivityCount, GetWeeklyProgress
from models import Activity, ActivityStatus, User


@app.route("/footprint/compute", methods=["POST"])
def compute():
    app.logger.info("Start footprint computation")
    data = request.json
    result = ComputeFootprint().execute(data)

    return jsonify(result)


@app.route("/benefit", methods=["GET"])
def get_benefit():
    activities = Activity.query.filter_by(status=ActivityStatus.success).all()
    total_saved = 0
    for activity in activities:
        total_saved += activity.get_benefit()

    return jsonify(dict({"total_saved": total_saved}))


@app.route("/footprints", methods=["GET"])
@login_required
def get_footprints_history():

    footprints = GetFootprintHistory().execute(current_user)
    result = dict()
    result['footprints'] = _serialize_footprints_array(footprints)

    return jsonify(result)


@app.route("/dashboard", methods=["GET"])
@login_required
def get_info():

    footprints = GetFootprints().execute(current_user)

    weekly_progress = GetWeeklyProgress().execute(current_user)
    app.logger.info(weekly_progress)

    total_saved = get_benefit().json.get("total_saved")

    activity_count = GetActivityCount().execute(current_user)

    # TODO: it will be very costly
    # TODO: Need to remove this before service opening
    total_saved_by_user = OrderedDict()
    users = User.query.all()
    users_count = 0

    for user in users:
        activities = Activity.query.\
            filter_by(status=ActivityStatus.success).\
            filter_by(user=user).\
            all()
        total_saved = 0
        for activity in activities:
            total_saved += activity.get_benefit()
        total_saved_by_user[user.id] = total_saved
        users_count += 1

    leaderbord = OrderedDict(sorted(total_saved_by_user.items(), key=operator.itemgetter(1)))
    user_rank = list(leaderbord.keys()).index(current_user.id)
    app.logger.info(str(user_rank) + "/" + str(users_count))

    # result = dict({# "leaderbord":
    #                   #     {
    #                   #         "rank": 100,
    #                   #         "user_id": 1,
    #                   #         "total": 1000,
    #                   #     },

    result = dict()
    result['statistics'] = {"total_carbon_saved": total_saved}
    result['activities'] = {"activity_count": activity_count}
    result['leaderbord'] = {"rank": str(user_rank) + "/" + str(users_count)}
    result['footprints'] = _serialize_footprints(footprints)

    return jsonify(result)


def _serialize_footprints(footprints):
    return list(map(_serialize_footprint, footprints))


def _serialize_footprint(footprint):
    dict_footprint = footprint._asdict()
    return dict_footprint


def _serialize_footprints_array(footprints):
    return list(map(_serialize_footprint_array, footprints))


def _serialize_footprint_array(footprint):
    result = []
    for fp in footprint:
        result.append(fp._asdict())
    return result
