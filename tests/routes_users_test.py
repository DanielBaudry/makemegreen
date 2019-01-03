from datetime import datetime, timedelta
from unittest.mock import patch

import pytest

from models import BaseObject
from models.user import User
from tests.conftest import clean_database
from utils.test_utils import API_URL, req, req_with_auth, create_user

BASE_DATA = {
    'email': 'test@test.fr',
    'password': 'test12345678',
}


def assert_signup_error(data, err_field):
    r_signup = req.post(API_URL + '/users/signup',
                        json=data)
    assert r_signup.status_code == 400
    error = r_signup.json()
    assert err_field in error


@pytest.mark.standalone
@clean_database
def test_signup_should_not_work_without_email(app):
    # Given
    data = BASE_DATA.copy()
    del (data['email'])

    # When
    r_signup = req.post(API_URL + '/users/signup',
                        json=data)

    # Then
    assert r_signup.status_code == 400
    error = r_signup.json()
    assert 'email' in error


@pytest.mark.standalone
@clean_database
def test_signup_should_not_work_with_invalid_email(app):
    # Given
    data = BASE_DATA.copy()
    data['email'] = 'toto'

    # When
    r_signup = req.post(API_URL + '/users/signup',
                        json=data)

    # Then
    assert r_signup.status_code == 400
    error = r_signup.json()
    assert 'email' in error


@pytest.mark.standalone
def test_signup_should_not_work_without_password():
    # Given
    data = BASE_DATA.copy()
    del (data['password'])

    # When
    r_signup = req.post(API_URL + '/users/signup',
                        json=data)

    # Then
    assert r_signup.status_code == 400
    error = r_signup.json()
    assert 'password' in error


@pytest.mark.standalone
def test_signup_should_not_work_with_invalid_password():
    # Given
    data = BASE_DATA.copy()
    data['password'] = 'short'

    # When
    r_signup = req.post(API_URL + '/users/signup',
                        json=data)

    # Then
    assert r_signup.status_code == 400
    error = r_signup.json()
    # assert 'password' in error


@pytest.mark.standalone
@clean_database
def test_signup(app):
    r_signup = req.post(API_URL + '/users/signup',
                        json=BASE_DATA)
    # assert r_signup.status_code == 201
    # assert 'Set-Cookie' in r_signup.headers


@pytest.mark.standalone
@clean_database
def test_signup_should_not_work_again_with_same_email(app):
    req.post(API_URL + '/users/signup',
             json=BASE_DATA)

    # When
    r_signup = req.post(API_URL + '/users/signup',
                        json=BASE_DATA)

    # Then
    assert r_signup.status_code == 400
    error = r_signup.json()
    assert 'email' in error


@pytest.mark.standalone
def test_get_profile_should_work_only_when_logged_in():
    r = req.get(API_URL + '/users/current')
    assert r.status_code == 401


@pytest.mark.standalone
@clean_database
def test_get_profile_should_return_the_users_profile_without_password_hash(app):
    user = create_user(email='test@test.fr', password='test12345678')
    BaseObject.check_and_save(user)
    r = req_with_auth(email='test@test.fr',
                      password='test12345678') \
        .get(API_URL + '/users/current')
    user_json = r.json()
    assert r.status_code == 200
    assert user_json['email'] == 'test@test.fr'