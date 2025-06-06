from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Todo: 之后读取环境变量来获取数据库的连接信息
SQLALCHEMY_DATABASE_URL = "mysql://foowikiauth:FoowiKIAuth@localhost:3306/foowikidb"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, pool_pre_ping=True, pool_recycle=3600
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
