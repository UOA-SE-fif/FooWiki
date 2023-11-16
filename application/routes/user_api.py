from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session


from ..core import create_access_token, settings
from ..orm import schemas
from ..orm import register_user, login_user, authenticate_user, get_user, change_user_data

from ..orm.database import get_db

router_user = APIRouter()


@router_user.post('/token', response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
    创建token的路由
    @param form_data: 用于创建token时使用的表单
        username: str
        password: str
    @param db: 路由传回的当前会话的db，获取数据库链接
    @return: Token
        token: str
    """
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    access_token = create_access_token(
        data={"sub": user.username}
    )
    return schemas.Token(token=access_token)


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """
    通过token获取当前的用户
    @param token: str JWT令牌
    @param db: 路由传回的当前会话的db，获取数据库链接
    @return: UserAuth 当前用户的信息
        userid int
        username str
        email str
        avatar str
        appetite float
        flavor list(str)
        password str
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials"
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=settings.ALGORITHM)
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user(username=username, db=db)
    if user is None:
        raise credentials_exception
    return user


@router_user.post('/register', response_model=schemas.RegisterResponse)
async def register(schema: schemas.UserRegister, db: Session = Depends(get_db)):
    """
    注册账户的路由
    @param schema: UserRegister
        username: str
        email: str
        password: str
    @param db: 路由传回的当前会话的db，获取数据库链接
    @return: RegisterResponse
        code: int
        message: str
        data: None
    """
    username = schema.username
    password = schema.password
    email = schema.email
    code = register_user(username=username, email=email, password=password, db=db)
    if code == 0:
        response = schemas.RegisterResponse(code=code, message='operation success')
    elif code == 201:
        response = schemas.RegisterResponse(code=code, message='has been registered')
    else:
        response = schemas.RegisterResponse(code=code, message='operation fail')
    return response


@router_user.put('/login', response_model=schemas.LoginResponse)
async def login(schema: schemas.UserLogin, db: Session = Depends(get_db)):
    """
    登录账号的路由
    @param schema: UserLogin
        username: str
        password: str
    @param db: 路由传回的当前会话的db，获取数据库链接
    @return: LoginResponse
        code: int
        message: str
        data: Token
    """
    username = schema.username
    password = schema.password
    code = login_user(username=username, password=password, db=db)
    if code == 0:
        form_data = OAuth2PasswordRequestForm(
            username=username,
            password=password
        )
        token = await login_for_access_token(form_data=form_data, db=db)
        access_token = token.token
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
async def info_get():
    """
    获取当前用户的用户信息
    @return: InfoResponse
        code: int
        message: str
        data: UserInfo
    """
    try:
        user = get_current_user()
    except Exception as error:
        print(error)
        return schemas.InfoResponse(
            code=1,
            message="operation fail, Could not validate credentials",
            data=None
        )
    user_data_temp = schemas.UserInfo(
        username=user.username,
        email=user.email,
        avatar=user.avatar,
        appetite=user.appetite,
        flavor=user.flavor
    )
    return schemas.InfoResponse(
        code=0,
        message="operation success",
        data=user_data_temp
    )


@router_user.post('/info', response_model=schemas.InfoResponse)
async def info_post(schema: schemas.UserInfo, db: Session = Depends(get_db)):
    """
    修改用户的信息
    @param schema: UserInfo 修改后的用户信息
        username str
        email str
        avatar str
        appetite float
        flavor list(str)
    @param db: 路由传回的当前会话的db，获取数据库链接
    @return: InfoResponse 修改后的用户所有信息
        code: int
        message: str
        data: UserInfo
    """
    try:
        user = get_current_user()
    except Exception as error:
        print(error)
        return schemas.InfoResponse(
            code=1,
            message="operation fail, Could not validate credentials",
            data=None
        )
    username_origin = user.username
    username = schema.username
    email = schema.email
    avatar = schema.avater
    appetite = schema.appetite
    flavor = schema.flavor
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
                email=user.email,
                avatar=user.avatar,
                appetite=user.appetite,
                flavor=user.flavor
            )
        else:
            user = get_user(username_origin, db)
            user_data_temp = schemas.UserInfo(
                username=user.username,
                email=user.email,
                avatar=user.avatar,
                appetite=user.appetite,
                flavor=user.flavor
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
