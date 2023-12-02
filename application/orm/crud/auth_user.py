import hashlib
from sqlalchemy.orm import Session
from application.orm import models


def register_user(username: str, email: str, password: str, db: Session):
    """
    当用户注册账号时，将会调用此函数。
    @param username: str, 用户账户名
    @param email: str, 用户邮箱号
    @param password: str, 用户密码
    @param db: Session, router传入的db，用于链接数据库
    @return: 0 成功注册
             201 用户名/邮箱已经被注册
             202 其他错误
    """
    password = hashlib.sha256(password.encode("utf-8")).hexdigest()  # SHA256加密
    user = models.UserAuth(
        username=username,
        user_password=password,
        useremail=email
    )  # 创建用户
    if db.query(models.UserAuth).filter(models.UserAuth.username == username).first():
        # 检查用户名是否存在
        return 201
    if db.query(models.UserAuth).filter(models.UserAuth.useremail == email).first():
        # 检查用户邮箱是否存在
        return 201
    db.add(user)
    try:
        db.commit()
        return 0
    except Exception as error:
        db.rollback()
        print(error)
        return 202


async def login_user(username: str, password: str, db: Session):
    """
    当用户登录账户时，将调用此函数。
    @param username: str, 用户账户名
    @param password: str, 用户密码
    @param db: Session, router传入的db，用于链接数据库
    @return: 0 成功登录
             203 密码不匹配
             204 其他错误
    """
    password = hashlib.sha256(password.encode("utf-8")).hexdigest()  # SHA256加密
    user = db.query(models.UserAuth).filter(models.UserAuth.username == username).first()  # 检查用户是否存在
    if user:
        if user.user_password == password:
            return 0
        else:
            return 203  # 密码不匹配
    else:
        return 204


def change_user_data(
        username_origin: str,
        username: str,
        email: str,
        avatar: str,
        appetite: float,
        flavor: list[str],
        db: Session
):
    """
    当用户的信息需要变更时，调用此函数。
    @param username_origin: str, 用户原账户名
    @param username: str, 用户账户名
    @param email: str, 用户邮箱号
    @param avatar: str, 用户头像地址
    @param appetite: float, 用户饭量
    @param flavor: list[str], 用户口味
    @param db: Session, router传入的db，用于链接数据库
    @return: 0 成功更改
             201 邮箱/用户名已经注册
             202 其他错误
    """
    user = get_user(username_origin, db)
    if db.query(models.UserAuth).filter(models.UserAuth.username == username).first():
        return 201
    if db.query(models.UserAuth).filter(models.UserAuth.useremail == email).first():
        return 201
    if user:
        user.username = username
        user.useremail = email
        user.useravatar = avatar
        user.userappetite = appetite
        user.userflavor = flavor
        db.add(user)
        try:
            db.commit()
            return 0
        except Exception as error:
            print(error)
            db.rollback()
            return 202
    else:
        return 202


async def get_user(username: str, db: Session):
    """
    此函数用户实现“根据用户名获取用户”的功能。
    @param username: str, 待查用户名
    @param db: Session, router传入的db，用于链接数据库
    @return: UserAuth, 查找到的用户
    """
    user = db.query(models.UserAuth).filter(models.UserAuth.username == username).first()
    return user


def authenticate_user(username: str, password: str, db: Session):
    """
    当用户需要鉴权时，调用此函数。
    @param username: str, 用户账户名
    @param password: str, 用户密码
    @param db: Session, router传入的db，用于链接数据库
    @return: UserAuth, 鉴权后确定可以返回的用户信息
             False, 鉴权后不可返回用户信息
    """
    password = hashlib.sha256(password.encode("utf-8")).hexdigest()
    user = get_user(username=username, db=db)
    print(user)
    if not user:
        return False
    if not user.user_password == password:
        return False
    return user
