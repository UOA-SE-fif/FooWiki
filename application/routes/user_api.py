from flask import Blueprint, request, render_template
from ..core import register_user

user_api = Blueprint('user_api', __name__, url_prefix='/api')

@user_api.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    else:
        username = request.form.get('username')
        password = request.form.get('password')
        status = register_user(username, password)
        if status == 0:
            response = {'status': status, 'message': '注册成功'}
        else:
            response = {'status': status, 'message': '注册失败'}
        return response

