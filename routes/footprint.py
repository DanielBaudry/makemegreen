"""users routes"""
from flask import current_app as app, jsonify, request
from flask_login import current_user, login_required, logout_user, login_user


@app.route("/footprint/compute", methods=["POST"])
def compute():
    data = request.get_json()
    # TODO: Charles
    print(data)
    result = "80 kg / CO2"
    return jsonify(result)
