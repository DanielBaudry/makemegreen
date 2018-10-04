import pytest

from models import BaseObject
from models.user import User
from models.footprint import Footprint
from tests.conftest import clean_database
from utils.test_utils import API_URL, req, req_with_auth, create_user

BASE_DATA = {
    'email': 'test@test.fr',
    'password': 'testpwd',
    'username': 'Test',
}


@pytest.mark.standalone
@clean_database
def test_get_footprint_for_user(app):
    # user = User()
    # user.username = 'Test'
    # user.email = 'test@test.com'
    # user.setPassword('testpsswd')
    # footprint = Footprint()
    # footprint.user_id = 1
    # footprint.carbon_footprint = 45
    # footprint.waste_footprint = 500
    # footprint.water_footprint = 1000

    # objects_to_save = [user, footprint]
    # BaseObject.check_and_save(*objects_to_save)

    # Given

    # When

    # Then

