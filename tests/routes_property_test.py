import pytest

from models import BaseObject, Property, UserProperty
from tests.conftest import clean_database
from utils.test_utils import API_URL, req_with_auth, create_user


@pytest.mark.standalone
@clean_database
def test_get_property_should_return_false_for_property_is_not_answered_already(app):
    # Given
    obj_to_save = []
    user = create_user(email='test@test.fr',
                       username='test',
                       password='test12345678')
    obj_to_save.append(user)
    property_obj = Property()
    property_obj.property_name = 'question_1'
    obj_to_save.append(property_obj)
    BaseObject.check_and_save(*obj_to_save)

    # When
    property_request = req_with_auth(email='test@test.fr', password='test12345678')\
        .get(API_URL + '/property')

    # Then
    assert property_request.status_code == 200
    content = property_request.json()
    assert 'question_1' in content


@pytest.mark.standalone
@clean_database
def test_get_property_should_return_value_for_property_if_already_answered(app):
    # Given
    obj_to_save = []
    user = create_user(email='test@test.fr',
                       username='test',
                       password='test12345678')
    obj_to_save.append(user)
    property_obj = Property()
    property_obj.property_name = 'question_1'
    obj_to_save.append(property_obj)
    BaseObject.check_and_save(*obj_to_save)
    user_property_obj = UserProperty()
    user_property_obj.user_id = user.id
    user_property_obj.property_id = property_obj.id
    user_property_obj.value = float(0.5)
    BaseObject.check_and_save(user_property_obj)

    # When
    property_request = req_with_auth(email='test@test.fr', password='test12345678') \
        .get(API_URL + '/property')

    # Then
    assert property_request.status_code == 200
    content = property_request.json()
    assert 'question_1' in content
    assert content['question_1'] == 0.5


@pytest.mark.standalone
@clean_database
def test_save_property_set_value_if_property_exists_and_user_property_does_not(app):
    # Given
    obj_to_save = []
    user = create_user(email='test@test.fr',
                       username='test',
                       password='test12345678')
    obj_to_save.append(user)
    property_obj = Property()
    property_obj.property_name = 'question_1'
    obj_to_save.append(property_obj)
    BaseObject.check_and_save(*obj_to_save)

    data = dict()
    data['question_1'] = "0.5"

    # When
    property_request = req_with_auth(email='test@test.fr', password='test12345678') \
        .post(API_URL + '/property', json=data)

    # Then
    assert property_request.status_code == 200

    user_property_obj = UserProperty.query.\
        filter_by(user_id=user.id).\
        filter_by(property_id=property_obj.id).\
        first()

    assert user_property_obj is not None
    assert user_property_obj.value == 0.5


@pytest.mark.standalone
@clean_database
def test_save_property_set_value_if_property_and_user_property_exist(app):
    # Given
    obj_to_save = []
    user = create_user(email='test@test.fr',
                       username='test',
                       password='test12345678')
    obj_to_save.append(user)
    property_obj = Property()
    property_obj.property_name = 'question_1'
    obj_to_save.append(property_obj)
    BaseObject.check_and_save(*obj_to_save)

    user_property_obj = UserProperty()
    user_property_obj.user_id = user.id
    user_property_obj.property_id = property_obj.id
    user_property_obj.value = float(12)
    BaseObject.check_and_save(user_property_obj)

    data = dict()
    data['question_1'] = "0.5"

    # When
    property_request = req_with_auth(email='test@test.fr', password='test12345678') \
        .post(API_URL + '/property', json=data)

    # Then
    assert property_request.status_code == 200

    user_property_obj = UserProperty.query. \
        filter_by(user_id=user.id). \
        filter_by(property_id=property_obj.id). \
        first()

    assert user_property_obj is not None
    assert user_property_obj.value == 0.5
