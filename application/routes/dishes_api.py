from fastapi import APIRouter
from ..core import foods_dishes

router_dish = APIRouter()


@router_dish.get('/dishesInfo')
async def get_dishes():
    dish_list = foods_dishes()
    return {
        "foods": dish_list
    }
