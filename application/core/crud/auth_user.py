from flask import jsonify
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


def login_user(username, password):
    """
    登录账号
    :param username: 用户名
    :param password: 密码
    :return: 登录成功返回0，否则返回状态码
    """
    # SHA256加密
    password = hashlib.sha256(password.encode("utf-8")).hexdigest()
    user = UserAuth.query.filter_by(username=username).first()
    if user:
        if user.password == password:
            return 0
        else:
            # Todo: log, status code
            return 1
    else:
        # Todo: log, status code
        return 1


def foods_dishes():
    """
    :return: 以列表形式返回关于菜品的数据
    """
    dishes = DishesBase.query.all()
    dish_list = []
    for dish in dishes:
        dish_data = {
            'dishid': dish.dishid,
            'dishname': dish.dishname,
            'describe': dish.describe,
            'price': dish.price,
            'shopname': dish.shopname,
            'floor': dish.floor
        }
        dish_list.append(dish_data)
    return jsonify(dish_list)
