from fastapi import APIRouter
from ..orm import schemas, register_user, login_user


router_user = APIRouter()


# Todo: 使用orm.database.get_db()获取数据库连接
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


# Todo: 使用orm.database.get_db()获取数据库连接
@router_user.put('/login')
async def login(schema: schemas.UserAuth):
    username = schema.username
    password = schema.user_password
    status = login_user(username, password)
    if status == 0:
        response = schemas.LoginResponse(status=status, message='登录成功')
    else:
        response = schemas.LoginResponse(status=status, message='登录失败')
    return response
