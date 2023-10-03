import os
from fastapi import FastAPI
from .routes import register_routes
from .config import config_dict


def create_app(test_config=None):
    # create and configure the app
    app = FastAPI()

    register_routes(app)

    # a simple page that says hello
    @app.get("/hello")
    def hello():
        return "Hello, World!"

    return app

