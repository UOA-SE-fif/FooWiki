from .user_api import router_user
from .dishes_api import router_dish
from .admin_dishes_api import router_admin_dish


def register_routes(app):
    app.include_router(router_user, prefix="/api/v1/user")
    app.include_router(router_dish, prefix="/api/v1")
    app.include_router(router_admin_dish, prefix="/api/v1/admin")

