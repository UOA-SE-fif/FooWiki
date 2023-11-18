from application.orm import models, schemas
from ..database import SessionLocal

# Todo: 使用router传入的db连接数据库
db = SessionLocal()


def get_dishes():
    """
    :return: 以列表形式返回关于菜品的数据
    """
    dishes = db.query(models.DishesBase).all()
    dish_list = []
    for dish in dishes:
        dish_list.append(schemas.DishesBase(
            dishid=dish.dishid,
            dishname=dish.dishname,
            describe=dish.describe,
            price=dish.price,
            shopname=dish.shopname,
            floor=dish.floor,
            flavor=dish.flavor,
#           type=dish.type,
            satiety=dish.satiety,
            vegetables=dish.vegetables,
            meat=dish.meat,
            pic=dish.pic
        ))
    return dish_list
