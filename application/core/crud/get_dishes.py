from sqlalchemy.orm import Session
from application.orm import models, schemas


def get_all_dishes(db: Session):
    """
    @param db: Session, router传入的db，用于链接数据库
    @return: 以列表形式返回关于菜品的数据
    """
    dishes = db.query(models.DishesBase).all()
    dish_list = []
    for dish in dishes:
        dish_list.append(schemas.DishesBase(
            dishid=dish.dishid,
            dishname=dish.dishname,
            pic=dish.pic,
            describe=dish.describe,
            price=dish.price,
            shopname=dish.shopname,
            floor=dish.floor,
            flavor=dish.flavor,
            # type=dish.type,
            satiety=dish.satiety,
            vegetables=dish.vegetables,
            meat=dish.meat
        ))
    return dish_list
