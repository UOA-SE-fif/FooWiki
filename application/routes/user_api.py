from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from typing import Annotated, Union
from ..core import create_access_token, get_current_user
from ..orm import schemas
from ..orm import register_user, login_user, authenticate_user, get_user, change_user_data

from ..orm.database import get_db

router_user = APIRouter()


@router_user.post('/register', response_model=schemas.RegisterResponse)
async def register(schema: schemas.UserRegister, db: Session = Depends(get_db)):
    """
    注册账户的路由
    @param schema: UserRegister
        username: str
        useremail: str
        user_password: str
    @param db: 路由传回的当前会话的db，获取数据库链接
    @return: RegisterResponse
        code: int
        message: str
        data: None
    """
    username = schema.username
    password = schema.user_password
    email = schema.useremail
    code = register_user(username=username, email=email, password=password, db=db)
    if code == 0:
        response = schemas.RegisterResponse(code=code, message='operation success')
    elif code == 201:
        response = schemas.RegisterResponse(code=code, message='has been registered')
    else:
        response = schemas.RegisterResponse(code=code, message='operation fail')
    return response


@router_user.post('/token', response_model=schemas.LoginResponse)
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                db: Session = Depends(get_db)):
    """
    登录账号的路由
    @param schema: UserLogin
        username: str
        user_password: str
    @param db: 路由传回的当前会话的db，获取数据库链接
    @return: LoginResponse
        code: int
        message: str
        data: Token
    """
    username = form_data.username
    password = form_data.password
    code = await login_user(username=username, password=password, db=db)
    if code == 0:
        form_data = OAuth2PasswordRequestForm(
            username=username,
            password=password
        )
        token = await create_access_token(data={"username": form_data.username})
        access_token = token
        response = schemas.LoginResponse(
            code=code,
            message='operation success',
            data=schemas.Token(token=access_token)
        )
    elif code == 203:
        response = schemas.LoginResponse(
            code=code,
            message='not match',
            data={}
        )
    else:
        response = schemas.LoginResponse(
            code=code,
            message='operation fail',
            data={}
        )
    return response


@router_user.get('/info', response_model=schemas.InfoResponse)
async def info_get(user: schemas.UserAuth = Depends(get_current_user)):
    """
    获取当前用户的用户信息
    @param user: 从前端Header获取的当前用户信息
    @return: InfoResponse
        code: int
        message: str
        data: UserInfo
    """
    if not user:
        return schemas.InfoResponse(
            code=1,
            message="operation fail, Could not validate credentials",
            data=None
        )
    user_data_temp = schemas.UserInfo(
        username=user.username,
        useremail=user.useremail,
        useravatar=user.useravatar,
        userappetite=user.userappetite,
        userflavor=user.userflavor
    )
    return schemas.InfoResponse(
        code=0,
        message="operation success",
        data=user_data_temp
    )


@router_user.post('/info', response_model=schemas.InfoResponse)
async def info_post(schema: schemas.UserInfo,
                    db: Session = Depends(get_db),
                    user: schemas.UserAuth = Depends(get_current_user)
                    ):
    """
    修改用户的信息
    @param user: 从前端Header获取的当前用户信息
    @param schema: UserInfo 修改后的用户信息
        username str
        useremail str
        useravatar str
        userappetite float
        userflavor list(str)
    @param db: 路由传回的当前会话的db，获取数据库链接
    @return: InfoResponse 修改后的用户所有信息
        code: int
        message: str
        data: UserInfo
    """
    if not user:
        return schemas.InfoResponse(
            code=1,
            message="operation fail, Could not validate credentials",
            data=None
        )
    username_origin = user.username
    username = schema.username
    email = schema.useremail
    avatar = schema.useravatar
    appetite = schema.userappetite
    flavor = schema.userflavor
    code = change_user_data(
        username_origin=username_origin,
        username=username,
        email=email,
        avatar=avatar,
        appetite=appetite,
        flavor=flavor,
        db=db
    )
    if code == 0:
        # 由于用户可能变更了username，也可能没有变更
        # 当username可以查询到用户时，使用username查询到的用户
        # 当username查询不到用户，但username_origin可以查询到，使用username_origin查询到的用户
        user = get_user(username, db)
        if user:
            user_data_temp = schemas.UserInfo(
                username=user.username,
                email=user.useremail,
                avatar=user.useravatar,
                appetite=user.userappetite,
                flavor=user.userflavor
            )
        else:
            user = get_user(username_origin, db)
            user_data_temp = schemas.UserInfo(
                username=user.username,
                useremail=user.useremail,
                useravatar=user.useravatar,
                userappetite=user.userappetite,
                userflavor=user.userflavor
            )
        response = schemas.InfoResponse(
            code=0,
            message="operation success",
            data=user_data_temp
        )
    elif code == 201:
        response = schemas.InfoResponse(
            code=1,
            message="has been registered",
            data=None
        )
    else:
        response = schemas.InfoResponse(
            code=1,
            message="operation fail",
            data=None
        )
    return response
