"""users routes"""
from flask import current_app as app, jsonify, request
from flask_login import current_user, login_required, logout_user, login_user

from models import BaseObject, User
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
    new_user = User(from_dict=request.json)
    new_user.id = None

    # TODO: test if request already contains footprints data
    app.logger.info(request.json)
    data = request.json
    footprints = data.get('footprints')

    objects_to_save = [new_user]
    BaseObject.check_and_save(*objects_to_save)

    login_user(new_user)

    return jsonify(new_user._asdict(include=USER_INCLUDES)), 201

