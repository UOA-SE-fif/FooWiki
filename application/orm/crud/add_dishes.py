from sqlalchemy.orm import Session
from application.orm import models, schemas


def add_dishes(dish: schemas.DishEstablish, db: Session):
    """
    管理员添加新的菜品，调用此函数
    @param dish: 待添加的菜品信息
    @param db: 路由传回的当前会话的db，获取数据库链接
    @return: 0 添加成功
             303 添加失败
    """
    new_dish = models.DishesBase(
        dishname=dish.dishname,
        pic=dish.pic,
        describe=dish.describe,
        price=dish.price,
        shopname=dish.shopname,
        floor=dish.floor,
        flavor=dish.flavor,
        satiety=dish.satiety,
        vegetables=dish.vegetables,
        meat=dish.meat
    )
    if db.query(models.DishesBase).filter(models.DishesBase.dishname == dish.dishname).first():
        # 菜品是否已经存在
        return 303
    db.add(new_dish)
    try:
        db.commit()
        return 0
    except Exception as error:
        db.rollback()
        print(error)
        return 303


def mod_dishes(dish: schemas.DishUpdate, db: Session):
    """
    管理员更新菜品，调用此函数
    @param dish: 待更新的菜品信息
    @param db: 路由传回的当前会话的db，获取数据库链接
    @return: 0 更新成功
             303 更新失败
    """
    origin_dish = db.query(models.DishesBase).filter(models.DishesBase.dishname == dish.dishname).first()
    if not origin_dish:
        # 菜品不存在，应当创建菜品
        return 303
    origin_dish.dishname = dish.dishname if dish.dishname is not None else origin_dish.dishname
    origin_dish.pic = dish.pic if dish.pic is not None else origin_dish.pic
    origin_dish.describe = dish.describe if dish.describe is not None else origin_dish.describe
    origin_dish.price = dish.price if dish.price is not None else origin_dish.price
    origin_dish.shopname = dish.shopname if dish.shopname is not None else origin_dish.shopname
    origin_dish.floor = dish.floor if dish.floor is not None else origin_dish.floor
    origin_dish.flavor = dish.flavor if dish.flavor is not None else origin_dish.flavor
    origin_dish.satiety = dish.satiety if dish.satiety is not None else origin_dish.satiety
    origin_dish.vegetables = dish.vegetables if dish.vegetables is not None else origin_dish.vegetables
    origin_dish.meat = dish.meat if dish.meat is not None else origin_dish.meat
    try:
        db.commit()
        return 0
    except Exception as error:
        db.rollback()
        print(error)
        return 303




