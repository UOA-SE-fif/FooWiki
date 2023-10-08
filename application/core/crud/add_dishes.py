from ...models import models, schemas, SessionLocal

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
        db.add(dish)
        db.commit()
    return True
