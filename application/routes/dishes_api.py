from fastapi import APIRouter
from fastapi import Request
from fastapi.templating import Jinja2Templates
from ..core import foods_dishes
import os

dishes_api = APIRouter()


@dishes_api.route('/getDishes', methods=['GET', 'POST'])
async def get_dishes(request: Request):
    if request.method == 'GET':
        # return templates.TemplateResponse("register.html", {"request": request})
        # 暂时无登录界面的模板文件
        return None
    else:
        dish_list = foods_dishes()
        return {
           "foods": dish_list
        }
