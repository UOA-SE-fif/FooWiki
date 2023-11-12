from application.orm import models, schemas
from ..database import SessionLocal

db = SessionLocal()


def add_dishes(dishes: list[schemas.DishesBase]):
    """
    :return: 以列表形式返回关于菜品的数据
    """
    for dish in dishes:
        dish = models.DishesBase(
            dishname=dish.dishname,
            describe=dish.describe,
            price=dish.price,
            shopname=dish.shopname,
            floor=dish.floor,
            type=dish.type,
            satiety=dish.satiety,
            vegetables=dish.vegetables,
            meat=dish.meat
        )
        # 检查菜品是否存在
        if db.query(models.DishesBase).filter(models.DishesBase.dishname == dish.dishname).first():
            raise Exception("菜品已存在")
        db.add(dish)
        db.commit()
    return True
