""" sandbox """

from pprint import pprint

from tests.data import sandbox_data

from models import *


def do_sandbox():

    users = []
    for user_data in sandbox_data.users_data:
        query = User.query.filter_by(username=user_data['username'])
        if query.count() == 0:
            user = User(from_dict=user_data)
            BaseObject.check_and_save(user)
            print("CREATED user")
            pprint(vars(user))
            users.append(user)
        else:
            users.append(query.one())

