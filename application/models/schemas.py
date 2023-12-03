# Todo: 创建schema.py文件，用于定义数据模型，面向用户的数据模型
from pydantic import BaseModel
from pydantic_settings import BaseSettings
from typing import Union, Any


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
    useremail str
    useravatar str
    userappetite float
    userflavor list(str)
    """
    userid: int = None
    username: str
    uservemail: str
    useravatar: str
    userappetite: float
    userflavor: list[str]


class UserAuth(UserBase):
    """
    userid int
    username str
    useremail str
    useravatar str
    userappetite float
    userflavor list(str)
    user_password str
    """
    user_password: str


class UserLogin(BaseModel):
    """
    username: str
    user_password: str
    """
    username: str
    user_password: str


class UserRegister(BaseModel):
    """
    username: str
    useremail: str
    user_password: str
    """
    username: str
    useremail: str
    user_password: str


class UserInfo(BaseModel):
    """
    username str|None
    useremail str|None
    useravatar str|None
    userappetite float|None
    userflavor list(str)|None
    可以选择更改部分用户信息
    """
    username: Union[str, None]
    useremail: Union[str, None]
    useravatar: Union[str, None]
    userappetite: Union[float, None]
    userflavor: Union[list[str], None]


class LoginResponse(BaseResponse):
    """
    code: int
    message: str
    data: {
        token: str
    }
    """
    data: Union[Token, Any]


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
        useremail: str
        useravatar: str
        userappetite: float
        userflavor: list[string]
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


class DishEstablish(BaseModel):
    """
    dishname: str
    pic: Union[str, None]
    describe: str
    price: float
    shopname: str
    floor: int
    flavor: Union[list[str], None]
    satiety: Union[int, None]
    vegetables: Union[int, None]
    meat: Union[int, None]
    """
    dishname: str
    pic: Union[str, None]
    describe: str = ""
    price: float
    shopname: str
    floor: int
    flavor: Union[list[str], None]
    satiety: Union[int, None]
    vegetables: Union[int, None]
    meat: Union[int, None]


class DishUpdate(DishEstablish):
    """
    dishid: int
    dishname: str
    pic: Union[str, None]
    describe: Union[str, None]
    price: Union[float, None]
    shopname: Union[str, None]
    floor: Union[int, None]
    flavor: Union[list[str], None]
    satiety: Union[int, None]
    vegetables: Union[int, None]
    meat: Union[int, None]
    """
    dishid: int
    describe: Union[str, None]
    price: Union[float, None]
    shopname: Union[str, None]
    floor: Union[int, None]


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
