import os

from flask import Flask
from .routes import register_routes
from .config import config_dict
from .models import db


def create_app(test_config=None):
    # create and configure the app
    app = Flask(
        __name__,
        instance_relative_config=True,
        template_folder="../web/templates",
        static_folder="../web/static",
    )
    
    app.config.from_mapping(config_dict)
    db.init_app(app)


    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    register_routes(app)

    # a simple page that says hello
    @app.route("/hello")
    def hello():
        return "Hello, World!"

    return app


app = create_app()
