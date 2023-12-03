from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..core import get_current_user
from ..orm import schemas
from ..orm.database import get_db
from ..orm import add_dishes, mod_dishes


router_admin_dish = APIRouter()


@router_admin_dish.post("/add/dish", response_model=schemas.DishResponse)
async def establish_dish(schema: schemas.DishEstablish,
                         db: Session = Depends(get_db),
                         user: schemas.UserAuth = Depends(get_current_user)
                         ):
    """
    此路由用于管理员创建新的菜品信息
    @param schema: DishEstablish, 准备创建的菜品信息
    @param db: 路由传回的当前会话的db，获取数据库链接
    @user schemas.UserAuth: 从前端Header获取的当前用户信息
    @return: DishResponse,
        code: int
        message: str
    """
    if not user:
        return schemas.DishResponse(
            code=301,
            message="operation fail, Could not validate credentials",
            data=None
        )
    code = add_dishes(dish=schema, db=db)
    if code == 0:
        return schemas.DishResponse(
            code=0,
            message="operation success",
            data=None
        )
    if code == 303:
        return schemas.DishResponse(
            code=303,
            message="operation failed",
            data=None
        )


@router_admin_dish.put("/mod/dish", response_model=schemas.DishResponse)
async def update_dish(schema: schemas.DishUpdate,
                      db: Session = Depends(get_db),
                      user: schemas.UserAuth = Depends(get_current_user),
                      ):
    """
    此路由用于管理员更新新的菜品信息
    @param schema: DishUpdate, 准备更新的菜品信息
    @param db: 路由传回的当前会话的db，获取数据库链接
    @user schemas.UserAuth: 从前端Header获取的当前用户信息
    @return:DishResponse,
        code: int
        message: str
    """
    if not user:
        return schemas.DishResponse(
            code=301,
            message="operation fail, Could not validate credentials",
            data=None
        )
    code = mod_dishes(dish=schema, db=db)
    if code == 0:
        return schemas.DishResponse(
            code=0,
            message="operation success",
            data=None
        )
    if code == 303:
        return schemas.DishResponse(
            code=303,
            message="operation failed",
            data=None
        )