from pydantic import BaseModel
from pydantic_settings import BaseSettings
from typing import Union


class BaseConfig(BaseSettings):
    SQLALCHEMY_DATABASE_URL: str = "mysql://foowikiauth:FoowiKIAuth@localhost:3306/foowikidb"
    SQLALCHEMY_POOL_RECYCLE: int = 3600


class Token(BaseModel):
    """
    token: str
    """
    token: str


class BaseResponse(BaseModel):
    """
    code: int
    message: str
    data: Any
    """
    code: int
    message: str
    data: Union[dict, list] = None


class UserBase(BaseModel):
    """
    userid int
    username str
    email str
    avatar str
    appetite float
    flavor list(str)
    """
    userid: int = None
    username: str
    email: str
    avatar: str
    appetite: float
    flavor: list[str]


class UserAuth(UserBase):
    """
    userid int
    username str
    email str
    avatar str
    appetite float
    flavor list(str)
    password str
    """
    password: str


class UserLogin(BaseModel):
    """
    username: str
    password: str
    """
    username: str
    password: str


class UserRegister(BaseModel):
    """
    username: str
    email: str
    password: str
    """
    username: str
    email: str
    password: str


class UserInfo(BaseModel):
    """
    username str|None
    email str|None
    avatar str|None
    appetite float|None
    flavor list(str)|None
    可以选择更改部分用户信息
    """
    username: Union[str, None]
    email: Union[str, None]
    avatar: Union[str, None]
    appetite: Union[float, None]
    flavor: Union[list[str], None]


class LoginResponse(BaseResponse):
    """
    code: int
    message: str
    data: {
        token: str
    }
    """
    data: Union[Token, None]


class RegisterResponse(BaseResponse):
    """
    code: int
    message: str
    data: None
    """
    pass


class InfoResponse(BaseResponse):
    """
    code: int
    message: str
    data: {
        username: str
        email: str
        avatar: str
        appetite: float
        flavor: list[string]
    }
    """
    data: Union[UserInfo, None]


class DishesBase(BaseModel):
    """
    dishid: int
    dishname: str
    pic: str
    describe: str
    price: float
    shopname: str
    floor: int
    flavor: list(str)
    satiety: int
    vegetables: int
    meat: int
    # type: str
    """
    dishid: int = None
    dishname: str
    pic: str
    describe: str = ''
    price: float
    shopname: str
    floor: int
    flavor: list[str]
    satiety: int
    vegetables: int
    meat: int
    # type: str


class DishesResponse(BaseResponse):
    """
    code: int
    message: str
    data: {[
        DishesBase,
        ...
    ]}
    """
    data: list[DishesBase]


class DishResponse(BaseResponse):
    """
    code: int
    message: str
    """
    data: None
