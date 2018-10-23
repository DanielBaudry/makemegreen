""" token """
import itertools
import random

from models import ApiErrors
from utils.config import EXPORT_TOKEN
from utils.human_ids import humanize


def tokenify(indexes):
    return  "".join([humanize(index) for index in indexes])

def random_token(length = 3):
    token = random.SystemRandom()
    return tokenify([token.randint(1, 255) for index in range(length)])

def get_all_tokens(length = 3):
    return map(
        tokenify,
        itertools.product(*[range(1, 256) for index in range(length)])
    )


def check_token(token):
    if EXPORT_TOKEN is None or EXPORT_TOKEN == '':
        raise ValueError("Missing environment variable EXPORT_TOKEN")
    api_errors = ApiErrors()
    if token is None:
        api_errors.addError('token', 'Vous devez préciser un jeton dans l''adresse (token=XXX)')
    if not token == EXPORT_TOKEN:
        api_errors.addError('token', 'Le jeton est invalide')
    if api_errors.errors:
        raise api_errors
