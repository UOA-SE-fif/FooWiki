from ...models import *

db = get_db()


def foods_dishes():
    """
    :return: 以列表形式返回关于菜品的数据
    """
    dishes = DishesBase.query.all()
    dish_list = []
    for dish in dishes:
        dish_data = dish.dict()
        dish_list.append(dish_data)
    return dish_list
