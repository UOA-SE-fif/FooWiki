from fastapi import APIRouter
from fastapi import Request
from fastapi.templating import Jinja2Templates
from ..core import register_user
from ..core import login_user
import os

user_api = APIRouter()
templates_directory = os.path.join(os.path.dirname(os.path.dirname(__file__)), "web", "templates")
# 获取模板文件的路径
templates = Jinja2Templates(directory="templates_directory")


@user_api.route('/register', methods=['GET', 'POST'])
async def register(request: Request):
    if request.method == 'GET':
        return templates.TemplateResponse("register.html", {"request": request})
    else:
        username = request.form.get('username')
        password = request.form.get('password')
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

