# Todo: 创建schema.py文件，用于定义数据模型，面向用户的数据模型
from pydantic import BaseModel
from pydantic_settings import BaseSettings


class BaseConfig(BaseSettings):
    SQLALCHEMY_DATABASE_URL: str = "mysql://foowikiauth:FoowiKIAuth@localhost:3306/foowikidb"
    SQLALCHEMY_POOL_RECYCLE: int = 3600


class UserBase(BaseModel):
    """
    userid: int
    username: str
    """
    userid: int = None
    username: str


class UserAuth(UserBase):
    """
    userid: int
    username: str
    user_password: str
    """
    user_password: str


class UserLogin(BaseModel):
    username: str
    password: str


class DishesBase(BaseModel):
    """
    dishid: int
    dishname: str
    describe: str
    price: float
    shopname: str
    floor: int
    type: str
    satiety: int
    vegetables: int
    meat: int
    """
    dishid: int = None
    dishname: str
    describe: str = ''
    price: float
    shopname: str
    floor: int
    type: str
    satiety: int
    vegetables: int
    meat: int


class BaseResponse(BaseModel):
    status: int
    message: str


class LoginResponse(BaseResponse):
    pass


class RegisterResponse(BaseResponse):
    pass


class DishesResponse(BaseResponse):
    dishes: list[DishesBase]

