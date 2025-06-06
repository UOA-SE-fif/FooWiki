from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
# import os
from datetime import datetime, timedelta
from typing import Optional, Annotated
from jose import jwt, JWTError
# from jose.jwt import ALGORITHMS
from sqlalchemy.orm import Session
from ..config import settings
from ..orm.crud.auth_user import get_user
from ..orm.database import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")


async def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """
    当需要创建token时，调用此函数。
    @param data: 表单 ，键值对形式{"sub": user.username}
    @param expires_delta: 期望维持token时长，以秒为单位
    @return: 编码后的JWT token
     """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHMS)
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    """
    实现获取当前用户信息的函数
    @param token: Token, 当前用户的token
    @param db: Session, router传入的db，用于链接数据库
    @return: UserAuth, 返回当前用户的信息
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials"
    )

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=settings.ALGORITHMS)
        username: str = payload.get("username")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = await get_user(username=username, db=db)
    if user is None:
        raise credentials_exception
    return user
