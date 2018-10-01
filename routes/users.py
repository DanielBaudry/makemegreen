"""users routes"""
from flask import current_app as app, jsonify, request
from flask_login import current_user, login_required, logout_user, login_user

from models import BaseObject, User, Footprint
from utils.includes import USER_INCLUDES
from utils.credentials import get_user_with_credentials


@app.route("/users/current", methods=["GET"])
@login_required
def get_profile():
    user = current_user._asdict(include=USER_INCLUDES)
    return jsonify(user)


@app.route("/users/signin", methods=["POST"])
def signin():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    user = get_user_with_credentials(email, password)
    app.logger.info(user._asdict(include=USER_INCLUDES))
    return jsonify(user._asdict(include=USER_INCLUDES)), 200


@app.route("/users/signout", methods=["GET"])
@login_required
def signout():
    logout_user()
    return jsonify({"global": "Deconnecté"})


@app.route("/users/signup", methods=["POST"])
def signup():
    data = request.json

    new_user = User(from_dict=request.json)
    new_user.id = None

    footprints = data.get('footprints')[0]

    BaseObject.check_and_save(new_user)

    objects_to_save = []
    for footprint in footprints.get('footprints'):
        footprint_obj = Footprint(from_dict=footprint)
        footprint_obj.user_id = int(new_user.get_id())
        objects_to_save.append(footprint_obj)

    BaseObject.check_and_save(*objects_to_save)

    login_user(new_user)

    return jsonify(new_user._asdict(include=USER_INCLUDES)), 201

