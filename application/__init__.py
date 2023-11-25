# import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import register_routes
from .config import config_dict
from .orm.database import Base, engine


def create_app():
    # create and configure the app
    app = FastAPI()

    """
    自动创建数据库表
    注意：如果表已经存在，则不会再创建，除非删除原来的表
    """
    Base.metadata.create_all(bind=engine)

    origins = [
        "http://127.0.0.1:3000",
        "http://localhost:3000"
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
