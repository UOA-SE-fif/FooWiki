from ...models.models import *
import hashlib

db = SessionLocal()


def register_user(username, password):
    """
    注册用户
    :param username: 用户名
    :param password: 密码
    :return: 注册成功返回0，否则返回状态码
    """
    # SHA256加密
    password = hashlib.sha256(password.encode("utf-8")).hexdigest()
    # 创建用户
    user = UserAuth(username=username, user_password=password)
    try:
        db.add(user)
        db.commit()
        return 0
    except Exception as e:
        print(e)
        return 1


def login_user(username, password):
    """
    登录账号
    :param username: 用户名
    :param password: 密码
    :return: 登录成功返回0，否则返回状态码
    """
    # SHA256加密
    password = hashlib.sha256(password.encode("utf-8")).hexdigest()
    user = db.query(UserAuth).filter(UserAuth.username == username).first()
    if user:
        if user.user_password == password:
            return 0
        else:
            return 1
    else:
        return 1

