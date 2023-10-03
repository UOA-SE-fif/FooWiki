from fastapi import APIRouter
from fastapi import Request
from fastapi.templating import Jinja2Templates
from ..core import register_user
from ..core import login_user
from ..models import schemas, models
import os

user_api = APIRouter()


@user_api.post('/register')
async def register(schema: schemas.UserAuth):
    username = schema.username
    password = schema.user_password
    status = register_user(username, password)
    if status == 0:
        response = {'status': status, 'message': '注册成功'}
    else:
        response = {'status': status, 'message': '注册失败'}
    return response


@user_api.route('/login', methods=['GET', 'POST'])
async def login(request: Request):
    if request.method == 'GET':
        # return templates.TemplateResponse("register.html", {"request": request})
        # 暂时无登录界面的模板文件
        return None
    else:
        username = request.form.get('username')
        password = request.form.get('password')
        status = login_user(username, password)
        if status == 0:
            response = {'status': status, 'login': True}
        else:
            response = {'status': status, 'login': False}
        return response
