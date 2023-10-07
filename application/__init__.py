import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import register_routes
from .config import config_dict


def create_app(test_config=None):
    # create and configure the app
    app = FastAPI()

    origins = [
        "http://127.0.0.1:3000"
    ]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    register_routes(app)

    # a simple page that says hello
    @app.get("/hello")
    def hello():
        return "Hello, World!"

    return app

