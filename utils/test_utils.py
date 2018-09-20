import json
import random
import string
from datetime import datetime, timedelta, timezone
from os import path
from pathlib import Path

import requests as req

from models.user import User
from models.footprint import Footprint
from utils.token import random_token

API_URL = "http://localhost:5000"

def req_with_auth(email=None, password=None):
    request = req.Session()
    if email is None:
        request.auth = ('pctest.admin@btmx.fr', 'pctestadmin')
    elif password is not None:
        request.auth = (email, password)
    else:
        json_path = Path(path.dirname(path.realpath(__file__))) / '..' / 'mock' / 'jsons' / 'users.json'd

        with open(json_path) as json_file:
            for user_json in json.load(json_file):
                print('user_json', user_json)
                if email == user_json['email']:
                    request.auth = (user_json['email'], user_json['password'])
                    break
                raise ValueError("Utilisateur inconnu: " + email)
    return request


def create_user(email='john.doe@test.com', 
                password='totallysafepsswd'):
    user = User()
    user.email = email
    user.setPassword(password)
    return user


def create_footprint(user):
    footprint = Footprint()
    footprint.user_id = user.get_id()
    footprint.carbon_footprint = 45
    footprint.waste_footprint = 500
    footprint.water_footprint = 1000
