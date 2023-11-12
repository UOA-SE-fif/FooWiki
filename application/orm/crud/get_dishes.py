from application.orm import models, schemas
from ..database import SessionLocal

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
            type=dish.type,
            satiety=dish.satiety,
            vegetables=dish.vegetables,
            meat=dish.meat
        ))
    return dish_list
