from .base_route import base_route
from .user_api import user_api
from .test_route import test_api

def register_routes(app):
    app.register_blueprint(base_route)
    app.register_blueprint(user_api)
    app.register_blueprint(test_api)


