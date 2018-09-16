"""users routes"""
from flask import current_app as app, jsonify, request
from flask_login import current_user, login_required
from engine.footprint import GetFootprint, ComputeFootprint

from models import *


@app.route("/footprint/compute", methods=["POST"])
def compute():
    app.logger.info("Start footprint computation")
    data = request.json
    app.logger.info(data[0].get('value'))
    #test = ComputeFootprint().execute(data)
    #app.logger.info(test)
    # TODO: Charles

    # TO REMOVE: test data for front
    result = dict({'carbon_footprint': 80,
                    'waste_footprint': 560,
                    'water_footprint': 1200})

    return jsonify(result)


@app.route("/footprint/save", methods=["POST"])
@login_required
def save_footprint():
    # TODO
    result = "save done"
    return jsonify(result)


@app.route("/footprint/me", methods=["GET"])
@login_required
def get_footprint():
    # For test purpose
    # current_user = User.query.filter_by(email='test@test.com').first()

    footprint = GetFootprint().execute(current_user)
    return jsonify(footprint)



