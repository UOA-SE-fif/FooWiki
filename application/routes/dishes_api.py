from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..orm import schemas
from ..orm.database import get_db
from ..orm import get_all_dishes


router_dish = APIRouter()


@router_dish.get("/dishes", response_model=schemas.DishesResponse)
async def get_dishes(db: Session = Depends(get_db)):
    """
    此路由用于获取全部菜品信息
    @param db: 路由传回的当前会话的db，获取数据库链接
    @return: DishesResponse,
        list[DishesBase]
    """
    dishes = get_all_dishes(db=db)
    if dishes:
        response = schemas.DishesResponse(
            code=0,
            message="operation success",
            data=dishes
        )
    else:
        response = schemas.DishesResponse(
            code=1,
            message="operation fail",
            data=[]
        )
    return response
