from ...models import models, schemas

db = SessionLocal()


def foods_dishes():
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
            floor=dish.floor
        ))
    return dish_list
