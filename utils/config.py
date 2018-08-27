""" config """
import os
from logging import INFO as LOG_LEVEL_INFO
from pathlib import Path

API_ROOT_PATH = Path(os.path.dirname(os.path.realpath(__file__))) / '..'
BROWSER_URL = os.environ.get('BROWSER_URL', 'http://localhost:3000')
ENV = os.environ.get('ENV', 'development')
IS_DEV = ENV == 'development'
IS_PROD = ENV == 'production'
LOG_LEVEL = LOG_LEVEL_INFO

if IS_DEV:
    API_URL = 'localhost'
elif IS_PROD:
    API_URL = 'https://makemegreen.fr'


