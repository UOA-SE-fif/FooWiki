from flask import Blueprint, render_template

base_route = Blueprint('base_route', __name__, url_prefix='/')

@base_route.route('/')
def hello():
    return render_template('index.html')