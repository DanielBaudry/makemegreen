import json
import random
import string
from datetime import datetime, timedelta, timezone
from os import path
from pathlib import Path
from sqlalchemy.orm import load_only
import requests as req

from tests.data import test_data
from models import *
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
    user.username = username
    return user


def create_footprint(user):
    footprint = Footprint()
    footprint.user_id = user.get_id()
    footprint.carbon_footprint = 45
    footprint.waste_footprint = 500
    footprint.water_footprint = 1000


def create_recommendation(title='titre test de la reco'):
    reco = Recommendation()
    reco.title = title
    return reco


def create_reco(reco_dict):
    test_user_id = 1
    recommendations = []
    if reco_dict == "recommendations_data_test":
        for reco_data in test_data.recommendations_data_test:
            query = Recommendation.query.filter_by(title=reco_data['title'])
            if query.count() == 0:
                reco = Recommendation(from_dict=reco_data)
                reco.user_id = test_user_id
                BaseObject.check_and_save(reco)
                print("Object: recommendation CREATED")
                recommendations.append(reco)
            else:
                recommendations.append(query.one())
    else:
        print("Wrong Param")
