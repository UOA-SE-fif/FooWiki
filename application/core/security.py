import os
from datetime import datetime, timedelta
from typing import Optional
from jose import jwt


class Settings:
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30  # in mins
    SECRET_KEY: str = os.getenv("SECRET_KEY")


settings = Settings()
print(os.getenv("SECRET_KEY"))

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """
    创建token
    @param data: 数据键值对形式 {"sub": user.username}
    @param expires_delta: 期望维持token时长
    @return: 编码后的JWT token
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt
