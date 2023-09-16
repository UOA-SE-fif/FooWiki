from flask import Blueprint

base_route = Blueprint('base_route', __name__, url_prefix='/')

@base_route.route('/')
def hello():
    return 'index.html'