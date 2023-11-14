import hashlib

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from ..core.security import create_access_token
from ..orm import schemas, register_user, login_user
from sqlalchemy.orm import Session

from ..orm.crud.auth_user import get_user
from ..orm.models import get_db  # get_db以及创建数据库链接的部分均有问题
from ..orm.schemas import Token

router_user = APIRouter()


def authenticate_user(username: str, password: str, db: Session):
    password = hashlib.sha256(password.encode("utf-8")).hexdigest()
    user = get_user(username=username, db=db)
    print(user)
    if not user:
        return False
    if not user.user_password == password:
        return False
    return user


@router_user.post('/token', response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    access_token = create_access_token(
        data={"sub": user.username}
    )
    return {"access_token": access_token, "token_type": "bearer"}


# Todo: 使用orm.database.get_db()获取数据库连接
@router_user.post('/register')
async def register(schema: schemas.UserAuth):
    username = schema.username
    password = schema.user_password
    status = register_user(username, password)
    if status == 0:
        response = schemas.RegisterResponse(status=status, message='operation success')
    elif status == 201:
        response = schemas.RegisterResponse(status=status, message='has been registered')
    else:
        response = schemas.RegisterResponse(status=status, message='operation fail')
    return response


# Todo: 使用orm.database.get_db()获取数据库连接
@router_user.put('/login')
async def login(schema: schemas.UserAuth):
    username = schema.username
    password = schema.user_password
    form_data = OAuth2PasswordRequestForm(
        username=username,
        password=password
    )
    status = login_user(username, password)
    token = login_for_access_token(form_data=form_data)
    if status == 0:
        response = schemas.LoginResponse(
            status=status,
            message='operation success',
            data={"token": token["access_token"]}
        )
    elif status == 203:
        response = schemas.LoginResponse(
            status=status,
            message='not match',
            data={}
        )
    else:
        response = schemas.LoginResponse(
            status=status,
            message='operation fail',
            data={}
        )
    return response

# @router_user.get('/info')
# async def get_info():
#

