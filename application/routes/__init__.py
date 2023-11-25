from .user_api import router_user
from .dishes_api import router_dish


def register_routes(app):
    app.include_router(router_user, prefix='/api/v1/user')
    app.include_router(router_dish, prefix='/api/v1')

