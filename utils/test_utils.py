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
    request.auth = (email, password)
    return request


def create_user(email='john.doe@test.com',
                username='john',
                password='totallysafepsswd'):
    user = User()
    user.email = email
    user.username = username
    user.setPassword(password)
    return user


def create_footprint(user):
    footprint = Footprint()
    footprint.user_id = user.get_id()
    footprint.carbon_footprint = 45
    footprint.waste_footprint = 500
    footprint.water_footprint = 1000
