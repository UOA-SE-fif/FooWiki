from .user_api import user_api
from .dishes_api import dishes_api


def register_routes(app):
    app.include_router(user_api)
    app.include_router(dishes_api)
    return None


