from ...models import *
import hashlib


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
        db.session.add(user)
        db.session.commit()
        return 0
    except Exception as e:
        # Todo: log, status code
        print(e)
        return 1
