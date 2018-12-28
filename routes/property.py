"""property routes"""
from flask import current_app as app, jsonify, request
from flask_login import current_user, login_required

from engine.property import GetUserProperties, SaveUserProperties


@app.route("/property", methods=['POST'])
@login_required
def update_user_properties():
    data = request.json
    SaveUserProperties().execute(data=data, user_id=current_user.id)
    return jsonify("ok"), 200


@app.route("/property", methods=['GET'])
@login_required
def get_user_properties():
    result = GetUserProperties().execute(user_id=current_user.id)
    return jsonify(result), 200
