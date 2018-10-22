"""users routes"""
from flask import current_app as app, jsonify, request
from flask_login import current_user, login_required

from engine.recommendation import AddRecommendation
from models import Recommendation, Activity
from collections import OrderedDict

# TODO: login_required or not for GET and list methods?
from utils.token import _check_token


@app.route("/recommendations", methods=["POST"])
def add_recommendation():
    token = request.args.get('token')
    _check_token(token)
    app.logger.info("Start add recommendations")
    data = request.json
    app.logger.info(data)
    index = 0
    while index < len(data):
        print("adding first reco")
        AddRecommendation().execute(current_user, data[index])
        index += 1

    result = dict({"success": "yes"})

    return jsonify(result)


@app.route("/recommendations", methods=["GET"])
@login_required
def list_recommendations():
    reco_already_attach_to_user = Activity.query.\
        with_entities(Activity.recommendation_id).\
        filter_by(user_id=current_user.get_id()).all()
    app.logger.info(reco_already_attach_to_user)
    query = Recommendation.query.\
        filter(Recommendation.id.notin_(reco_already_attach_to_user))
    recommendations = query.all()
    app.logger.info(recommendations)
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
