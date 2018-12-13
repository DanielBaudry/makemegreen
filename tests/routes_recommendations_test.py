from datetime import datetime, timedelta
from unittest.mock import patch

import pytest

from models import BaseObject
from models.user import User
from tests.conftest import clean_database
from utils.test_utils import API_URL, req, create_user

BASE_DATA = {
    'email': 'test@test.fr',
    'password': 'test12345678',
}


#ToDo : à mettre dans route_test-reco.py
@pytest.mark.standalone
def test_get_search_recommandation_in_title():
    r = req.get(API_URL + '/recommendations/search?search="blablablablabla"')
    assert r.status_code == 200

