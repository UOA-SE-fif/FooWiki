import os
from fastapi import FastAPI
from .routes import register_routes
from .config import config_dict
from .models import get_db
from .models import Base

def create_app(test_config=None):
    # create and configure the app
    app = FastAPI()
    app.config = config_dict
    Base.init_app(app)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    register_routes(app)

    # a simple page that says hello
    @app.get("/hello")
    def hello():
        return "Hello, World!"

    return app


app = create_app()
