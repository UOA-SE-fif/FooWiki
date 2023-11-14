from fastapi import APIRouter
from ..orm import schemas
from ..orm import get_dishes as get_dish  # 防止命名冲突

router_dish = APIRouter()


# Todo: 使用orm.database.get_db()获取数据库连接
@router_dish.get('/dishesInfo')
async def get_dishes():
    dishes_list = get_dish()
    response = schemas.DishesResponse(dishes = dishes_list,status=1,message="获取成功")
    return response
