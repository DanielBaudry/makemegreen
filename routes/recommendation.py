"""users routes"""
from flask import current_app as app, jsonify, request
from flask_login import current_user, login_required
from models import Recommendation
from collections import OrderedDict

# TODO: login_required or not for GET and list methods?


@app.route("/recommendation", methods=["POST"])
@login_required
def add_recommendation():
    app.logger.info("Start add recommendation")
    data = request.get_json()
    app.logger.info(data)

    # TODO:

    result = dict({"success": "yes"})

    return jsonify(result)


@app.route("/recommendations", methods=["GET"])
@login_required
def list_recommendations():
    query = Recommendation.query.filter_by(user_id=current_user.get_id())
    recommendations = query.all()
    result = OrderedDict()
    result['recommendations'] = _serialize_recommendations(recommendations)

    return jsonify(result), 200


@app.route('/recommendations/<reco_id>', methods=['GET'])
@login_required
def get_recommendation(reco_id):
    # TODO: use engine to query rec
    query = Recommendation.query.filter_by(id=reco_id)
    recommendation = query.first_or_404()
    return jsonify(recommendation), 200


def _serialize_recommendations(recommendations):
    return list(map(_serialize_recommendation, recommendations))


def _serialize_recommendation(recommendation):
    dict_recommendation = recommendation._asdict()
    return dict_recommendation
