"""users routes"""
from flask import current_app as app, jsonify, request
from flask_login import current_user, login_required
from models import User, Recommendation
from engine.activity import StartActivity


# TODO: login_required or not for GET and list methods?

@app.route("/activity/<reco_id>", methods=["GET"])
@login_required
def start_activity(reco_id):
    app.logger.info("Start new activity based on specific recommendation")
    activity = StartActivity().execute(int(current_user.get_id()), int(reco_id))
    app.logger.info(activity)
    result = dict({"success": "yes"})

    return jsonify(result)


@app.route("/activity", methods=["GET"])
@login_required
def list_my_activity():
    # TODO
    result = dict({"activities": [
                        {
                            "id":"1",
                            "date_start": "2018-09-15 15:14",
                            "date_end": "2018-09-25 15:14",
                            "is_success": "true",
                            "recommendation": {
                                "id": 12,
                                "name": "toto",
                                "type": "water",
                                "benefit": 8
                            }
                        },
                        {
                            "id":"2",
                            "date_start": "2018-09-15 15:14",
                            "date_end": "2018-09-25 15:14",
                            "is_success": "false",
                            "recommendation": {
                                "id": 121,
                                "name": "toto",
                                "type": "water",
                                "benefit": 80
                            }
                        },{
                            "id":"3",
                            "date_start": "2018-09-15 15:14",
                            "date_end": "",
                            "is_success": "false",
                            "recommendation": {
                                "id": 24,
                                "name": "toto",
                                "type": "waste",
                                "benefit": 30
                            }
                        },
                   ]})

    return jsonify(result)

