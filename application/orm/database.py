from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import Session


# 重写Session类，使其提交失败时自动回滚
class ReusableSession(Session):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def commit(self):
        try:
            super().commit()
        except Exception as e:
            self.rollback()
            raise e


# Todo: 之后读取环境变量来获取数据库的连接信息
SQLALCHEMY_DATABASE_URL = "mysql://foowikiauth:FoowiKIAuth@localhost:3306/foowikidb"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, pool_pre_ping=True, pool_recycle=3600
)
# 将ReusableSession作为sessionmaker的class参数传入，使其创建的Session自动回滚
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=ReusableSession)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
