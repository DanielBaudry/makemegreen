"""users routes"""
from flask import current_app as app, jsonify, request
from flask_login import current_user, login_required, logout_user, login_user


@app.route("/footprint/compute", methods=["POST"])
def compute():
    app.logger.info("Start footprint computation")
    data = request.get_json()
    app.logger.info(data)

    # TODO: Charles

    result = "80 kg / CO2"
    return jsonify(result)
