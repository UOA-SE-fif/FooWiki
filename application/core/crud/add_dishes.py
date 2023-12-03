from sqlalchemy.orm import Session
from application.orm import models, schemas


def add_dishes(dish: schemas.DishEstablish, db: Session):
    """
    管理员添加新的菜品，调用此函数
    @param dish: 待添加的菜品信息
    @param db: 路由传回的当前会话的db，获取数据库链接
    @return: 0 添加成功
             1 添加失败
    """
    # """
    # :return: 以列表形式返回关于菜品的数据
    # """
    # for dish in dishes:
    #     dish = models.DishesBase(
    #         dishname=dish.dishname,
    #         describe=dish.describe,
    #         price=dish.price,
    #         shopname=dish.shopname,
    #         floor=dish.floor,
    #         # type=dish.type,
    #         satiety=dish.satiety,
    #         vegetables=dish.vegetables,
    #         meat=dish.meat,
    #         pic=dish.pic,
    #         flavor=dish.flavor
    #     )
    #     # 检查菜品是否存在
    #     if db.query(models.DishesBase).filter(models.DishesBase.dishname == dish.dishname).first():
    #         raise Exception("菜品已存在")
    #     db.add(dish)
    #     db.commit()
    # return True


def mod_dishes(dish: schemas.DishUpdate, db: Session):
    """
    管理员更新菜品，调用此函数
    @param dish: 待更新的菜品信息
    @param db: 路由传回的当前会话的db，获取数据库链接
    @return: 0 更新成功
             1 更新失败
    """
