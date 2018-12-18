from datetime import datetime, timedelta
from unittest.mock import patch

import pytest

from models import BaseObject
from models.recommendation import Recommendation
from tests.conftest import clean_database
#TODO : from utils.test_utils import API_URL, req, create_recommendation

BASE_DATA = {
    'title': 'Nouvelle recommandation pour faire un tests',
    'content': 'Contenu reco 1',
}

#ToDo : à mettre dans route_test-reco.py
@pytest.mark.standalone
def test_get_search_recommandation_in_title():

    r = req.get(API_URL + '/recommendations/search?search="blablablablabla"')
    assert r.status_code == 200

