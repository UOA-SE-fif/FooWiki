import pymysql
from user import User
from dish import Dish

db = pymysql.connect(host='localhost',  # 本地数据库
                     user='root',
                     password='密码',
                     db='数据库名称',
                     charset='utf8')  # 服务器名,账户,密码，数据库名称
cursor = db.cursor()


def find_user_by_name(username: str) -> User:
    sql = f"""select * from users where username='{username}';"""
    cursor.execute(sql)
    result = cursor.fetchall()
    return User(result[0][0], result[0][1], result[0][2])


def find_user_by_id(userid: int) -> User:
    sql = f"""select * from users where userid='{userid}';"""
    cursor.execute(sql)
    result = cursor.fetchall()
    return User(result[0][0], result[0][1], result[0][2])


def find_dish_by_name(dishname: str) -> Dish:
    sql = f"""select * from dishes where dishname='{dishname}';"""
    cursor.execute(sql)
    result = cursor.fetchall()
    return User(result[0][0], result[0][1], result[0][2], result[0][3], result[0][4])


def add_user(username: str, pw: str) -> None:
    try:
        sql = f"""insert into users (username, pw) values ('{username}', '{pw}');"""
        cursor.execute(sql)
        db.commit()  
    except Exception as e:
        db.rollback()  # 如果报错就撤回操作，保护数据
    db.close()


def add_dish(dishname: str, price: float, shopname: str, floor: int) -> None:
    try:
        sql = f"""insert into dishes (dishname, price, shopname, floor) values ('{dishname}', '{price}', '{shopname}',  '{floor}');"""
        cursor.execute(sql)
        db.commit() 
    except Exception as e:
        db.rollback()  # 如果报错就撤回操作，保护数据
    db.close()



