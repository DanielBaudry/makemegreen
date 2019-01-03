"""users routes"""
from flask import current_app as app, jsonify, request
from flask_login import current_user, login_required

from engine.recommendation import AddRecommendation, DiscoverNewRecommendations
from models import Recommendation, Activity, ActivityStatus
from collections import OrderedDict

# TODO: login_required or not for GET and list methods?
from utils.token import check_token

@app.route("/recommendations", methods=["POST"])
def add_recommendations():
    token = request.args.get('token')
    check_token(token)
    app.logger.info("Start add recommendations")
    data = request.json
    app.logger.info(data)
    index = 0
    while index < len(data):
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

    return jsonify(result)

@app.route('/recommendations/<reco_id>', methods=['GET'])
@login_required
def get_recommendation(reco_id):
    # TODO: use engine to query rec
    query = Recommendation.query.filter_by(id=reco_id)
    recommendation = query.first_or_404()
    return jsonify(recommendation), 200

@app.route("/recommendations/search", methods=["GET"])
def search_recommendations():
    result = OrderedDict()
    if 'title' in request.args:
        in_title = request.args.get("title")
        word_list = in_title.split()
        recommendations = list()
        for word in word_list:
            query = Recommendation.query. \
                filter(Recommendation.title.ilike('%'+word+'%'))
            recommendations += query.all()
        if len(recommendations) == 0:
            result['error'] = "No recommendation found"
            return jsonify(result), 400
        else:
            recommendations_unique = list(set(recommendations))
            result['recommendations'] = _serialize_recommendations(recommendations_unique)
            return jsonify(result), 200
    else:
        result['error'] = "Wrong field"
        return jsonify(result), 400

def _serialize_recommendations(recommendations):
    return list(map(_serialize_recommendation, recommendations))


def _serialize_recommendation(recommendation):
    dict_recommendation = recommendation._asdict()
    return dict_recommendation
