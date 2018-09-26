"""users routes"""
from flask import current_app as app, jsonify, request
from flask_login import current_user, login_required
from engine.footprint import GetFootprint, ComputeFootprint


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


@app.route("/dashboard", methods=["GET"])
@login_required
def get_info():
    # For test purpose
    # current_user = User.query.filter_by(email='test@test.com').first()
    #
    # footprint = GetFootprint().execute(current_user)

    footprint = dict({"user_id": 1,
                      "leaderbord":
                          {
                              "rank": 100,
                              "user_id": 1,
                              "total": 1000,
                          },
                      "statistics":
                          {
                              "total_carbon_saved": 15000,
                              "percentage_earth_saved": 10,
                          },
                      "footprints": [
                          {
                              "id": 1,
                              "footprint_type": "carbon",
                              "footprint_value": 80
                          },
                          {
                              "id": 2,
                              "footprint_type": "waste",
                              "footprint_value": 560
                          },
                          {
                              "id": 3,
                              "footprint_type": "water",
                              "footprint_value": 1280
                          }
                      ]
                      })

    return jsonify(footprint)


