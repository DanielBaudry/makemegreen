from datetime import datetime, timedelta
from unittest.mock import patch
from flask import current_app as app
import pytest
from models import BaseObject
from models.recommendation import Recommendation
from tests.conftest import clean_database
from utils.test_utils import API_URL, req, create_reco
BASE_DATA = {
    'title': 'Nouvelle recommandation pour faire un tests',
    'content': 'Contenu reco 1',
}

@pytest.mark.standalone
def test_get_search_recommandation_in_title():
    r = req.get(API_URL + '/recommendations/search?title=prends vélo')
    search_json = r.json()
    print("test d'ecriture")
    assert r.status_code == 200
    assert len(search_json['recommendations']) == 3

@pytest.mark.standalone
def test_get_search_recommandation_in_title_special_char(app):
    create_reco("recommendations_data_special_char")
    r = req.get(API_URL + '/recommendations/search?title=vélo ça là être @#+%*$ $£è çàé &')
    search_json = r.json()
    assert r.status_code == 200
    assert len(search_json['recommendations']) == 3

@pytest.mark.standalone
def test_search_should_not_work_with_wrong_parameters():
    r = req.get(API_URL + '/recommendations/search?wrong_field=blablablablabla')
    search_json = r.json()
    assert r.status_code == 400
    assert search_json['error'] == 'Wrong field'

@pytest.mark.standalone
def test_search_without_parameters():
#Est ce que test est pertinent ?
    r = req.get(API_URL + '/recommendations/search?')
    search_json = r.json()
    assert r.status_code == 400
    assert search_json['error'] == 'Wrong field'

@pytest.mark.standalone
def test_search_without_text_in_the_form():
    r = req.get(API_URL + '/recommendations/search?title=""')
    search_json = r.json()
    assert r.status_code == 400
    assert search_json['error'] == 'No recommendation found'

@pytest.mark.standalone
def test_search_sql_injection_all():
    r = req.get(API_URL + '/recommendations/search?title=*')
    search_json = r.json()
    assert r.status_code == 200
    assert len(search_json['recommendations']) == 1