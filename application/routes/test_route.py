from flask import Blueprint, request, render_template
from ..core import register_user, foods_dishes, authentication

test_api = Blueprint('test_api', __name__, url_prefix='/api')
# Todo: 移动到dish_api.py
@test_api.route('/foo', methods=['GET'])
def foo():
    if request.method == 'GET':
        if authentication:
            response = foods_dishes()
            return response
    
