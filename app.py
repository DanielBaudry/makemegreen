""" app """
import os
from flask_cors import CORS
from flask import Flask

from models.db import db
from models.install import install_models
from utils.config import IS_DEV

app = Flask(__name__, static_url_path='/static')
app.secret_key = os.environ.get('FLASK_SECRET', 'HZ#1updrH9x6Vs!oQp0tC0!Q')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['TESTING'] = False
db.init_app(app)

cors = CORS(app,
    resources={r"/*": {"origins": "*"}},
    supports_credentials=True
)

# make Werkzeug match routing rules with or without a trailing slash
app.url_map.strict_slashes = False

with app.app_context():
    install_models()

    import utils.login_manager
    import routes


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    use_reloader = True if IS_DEV else False
    app.run(host="0.0.0.0", port=port, debug=IS_DEV, use_reloader=use_reloader)
