from fastapi import APIRouter
from fastapi import Request
from fastapi.templating import Jinja2Templates
import os

base_route = APIRouter()
templates_directory = os.path.join(os.path.dirname(os.path.dirname(__file__)), "web", "templates")
# 获取模板文件的路径
templates = Jinja2Templates(directory="templates_directory")


@base_route.get("/")
async def hello(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
