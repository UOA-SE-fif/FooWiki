import pymysql
from user import User

db = pymysql.connect(host='localhost',  # 本地数据库  
                     user='root',  
                     password='Root!2023',  
                     db='test',  
                     charset='utf8')  # 服务器名,账户,密码，数据库名称  
cursor = db.cursor()


def find_user_by_name(username) -> User:
    sql = f"""select * from users where username='{username}';"""
    cursor.execute(sql)
    result = cursor.fetchall()
    return User(result[0][0], result[0][1], result[0][2])



    


