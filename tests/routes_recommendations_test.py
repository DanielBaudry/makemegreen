import pytest
from models import BaseObject
from tests.conftest import clean_database
from utils.test_utils import API_URL, req, create_reco, create_user
BASE_DATA = {
    'title': 'Nouvelle recommandation pour faire un tests',
    'content': 'Contenu reco 1',
}


@pytest.mark.standalone
@clean_database
def test_search_without_text_in_the_form(app):
    user = create_user()
    user.id = 1
    BaseObject.check_and_save(user)
    create_reco("recommendations_data_test")
    r = req.get(API_URL + '/recommendations/search?title=""')
    search_json = r.json()
    assert r.status_code == 400
    assert search_json['error'] == 'No recommendation found'


@pytest.mark.standalone
@clean_database
def test_get_search_recommandation_in_title(app):
    r = req.get(API_URL + '/recommendations/search?title=prends vélo')
    search_json = r.json()
    print("test d'ecriture")
    assert r.status_code == 200
    assert len(search_json['recommendations']) == 3


@pytest.mark.standalone
@clean_database
def test_get_search_recommandation_in_title_special_char(app):
    r = req.get(API_URL + '/recommendations/search?title=vélo ça là être @#+%*$ $£è çàé &')
    search_json = r.json()
    assert r.status_code == 200
    assert len(search_json['recommendations']) == 3


@pytest.mark.standalone
@clean_database
def test_search_should_not_work_with_wrong_parameters(app):
    r = req.get(API_URL + '/recommendations/search?wrong_field=blablablablabla')
    search_json = r.json()
    assert r.status_code == 400
    assert search_json['error'] == 'Wrong field'


@pytest.mark.standalone
@clean_database
def test_search_without_parameters(app):
    r = req.get(API_URL + '/recommendations/search?')
    search_json = r.json()
    assert r.status_code == 400
    assert search_json['error'] == 'Wrong field'


@pytest.mark.standalone
@clean_database
def test_search_sql_injection_all(app):
    r = req.get(API_URL + '/recommendations/search?title=*')
    search_json = r.json()
    assert r.status_code == 200
    assert len(search_json['recommendations']) == 1