from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..orm import schemas
from ..orm.database import get_db


router_admin_dish = APIRouter()


@router_admin_dish.post("/add/dish", response_model=schemas.DishResponse)
async def establish_dish(schema: schemas.DishEstablish, db: Session = Depends(get_db)):
    """
    此路由用于管理员创建新的菜品信息
    @param schema: DishEstablish, 准备创建的菜品信息
    @param db: 路由传回的当前会话的db，获取数据库链接
    @return: DishResponse,
        code: int
        message: str
    """
    pass


@router_admin_dish.put("/mod/dish", response_model=schemas.DishResponse)
async def update_dish(schema: schemas.DishUpdate, db: Session = Depends(get_db)):
    """
    此路由用于管理员更新新的菜品信息
    @param schema: DishUpdate, 准备更新的菜品信息
    @param db: 路由传回的当前会话的db，获取数据库链接
    @return:DishResponse,
        code: int
        message: str
    """
    pass