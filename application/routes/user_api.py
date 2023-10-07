from fastapi import APIRouter
from ..core import register_user
from ..core import login_user
from ..models import schemas


router_user = APIRouter()


@router_user.post('/register')
async def register(schema: schemas.UserAuth):
    username = schema.username
    password = schema.user_password
    status = register_user(username, password)
    if status == 0:
        response = schemas.RegisterResponse(status=status, message='注册成功')
    else:
        response = schemas.RegisterResponse(status=status, message='注册失败')
    return response


@router_user.put('/login')
async def login(schema: schemas.UserAuth):
    username = schema.form.get('username')
    password = schema.form.get('password')
    status = login_user(username, password)
    if status == 0:
        response = schemas.LoginResponse(status=status, message='登录成功')
    else:
        response = schemas.LoginResponse(status=status, message='登录失败')
    return response
