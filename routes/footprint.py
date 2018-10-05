"""users routes"""
from flask import current_app as app, jsonify, request
from flask_login import current_user, login_required
from engine.footprint import GetFootprints, ComputeFootprint
from models import Activity, ActivityStatus
from sqlalchemy.sql import func


@app.route("/footprint/compute", methods=["POST"])
def compute():
    app.logger.info("Start footprint computation")
    data = request.json
    app.logger.info(data)
    result = ComputeFootprint().execute(data)
    app.logger.info(result)

    return jsonify(result)


@app.route("/footprint/save", methods=["POST"])
@login_required
def save_footprint():
    # TODO
    result = "save done"
    return jsonify(result)


@app.route("/benefit", methods=["GET"])
def get_benefit():
    activities = Activity.query.filter_by(status=ActivityStatus.success).all()
    total_saved = 0
    for activity in activities:
        total_saved += activity.get_benefit()

    return jsonify(dict({"total_saved": total_saved}))


@app.route("/dashboard", methods=["GET"])
@login_required
def get_info():

    footprints = GetFootprints().execute(current_user)

    total_saved = get_benefit().json.get("total_saved")

    # TODO: FOR leaderbord need to join recommendation and activities table in sqlalchemy
    # result = dict({# "leaderbord":
    #                   #     {
    #                   #         "rank": 100,
    #                   #         "user_id": 1,
    #                   #         "total": 1000,
    #                   #     },
    #                   "statistics":
    #                       {
    #                           "total_carbon_saved": total_saved,
    #                       },
    #                   })
    result = dict()
    result['statistics'] = {"total_carbon_saved": total_saved}
    result['footprints'] = _serialize_footprints(footprints)
    app.logger.info(result)

    return jsonify(result)


def _serialize_footprints(footprints):
    return list(map(_serialize_footprint, footprints))


def _serialize_footprint(footprint):
    dict_footprint = footprint._asdict()
    return dict_footprint
