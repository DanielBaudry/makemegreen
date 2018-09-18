"""users routes"""
from flask import current_app as app, jsonify, request
from flask_login import current_user, login_required
from models import User, Recommendation


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
    # TODO
    result = dict({"recommendations": [
                        {
                            "id":"1",
                            "name": "toto",
                            "type": "carbon",
                            "content": "bah en fait faut faire comme ça",
                            "difficulty_level": 2,
                            "benefit": 60
                        },
                        {
                            "id":"2",
                            "name": "toto",
                            "type": "water",
                            "content": "bah en fait faut faire comme ça",
                            "difficulty_level": 3,
                            "benefit": 80
                        },
                        {
                            "id":"2",
                            "name": "toto",
                            "type": "waste",
                            "content": "bah en fait faut faire comme ça aussi",
                            "difficulty_level": 1,
                            "benefit": 20
                        },
                   ]})

    return jsonify(result)


@app.route('/recommendations/<reco_id>', methods=['GET'])
@login_required
def get_recommendation(reco_id):
    # TODO: use engine to query rec
    query = Recommendation.query.filter_by(id=reco_id)
    recommendation = query.first_or_404()
    return jsonify(recommendation), 200

