"""users routes"""
from flask import current_app as app, jsonify, request
from flask_login import current_user, login_required

from engine.recommendation import DiscoverNewRecommendations
from models import Recommendation, Activity, ActivityStatus
from collections import OrderedDict

@app.route("/propositions", methods=["GET"])
@login_required
def discover_recommendations():
    reco_already_attach_to_user = Activity.query. \
        with_entities(Activity.recommendation_id). \
        filter((Activity.status == ActivityStatus.success) |
               (Activity.status == ActivityStatus.fail) |
               (Activity.status == ActivityStatus.pending)). \
        filter_by(user_id=current_user.get_id()).\
        all()

    propositions = DiscoverNewRecommendations().execute(current_user, reco_already_attach_to_user)

    result = OrderedDict()
    result['propositions'] = propositions

    return jsonify(result), 200


def _serialize_recommendations(recommendations):
    return list(map(_serialize_recommendation, recommendations))


def _serialize_recommendation(recommendation):
    dict_recommendation = recommendation._asdict()
    return dict_recommendation
