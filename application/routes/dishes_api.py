from fastapi import APIRouter
from ..core import register_user
from ..core import login_user
from ..core.crud.get_dishes import foods_dishes
from ..models import schemas

router_dish = APIRouter()


@router_dish.get('/dishesInfo')
async def get_dishes():
    dishes_list = foods_dishes()
    response = schemas.DishesResponse(dishes = dishes_list,status=1,message="获取成功")
    return response
