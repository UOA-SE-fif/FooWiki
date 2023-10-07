from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from application.models.database import Base, SessionLocal


class UserBase(Base):  # 用户基本信息
    """
    table:
        create table users (
            userid int primary key auto_increment,
            username varchar(100) unique not null,
            user_password varchar(32) not null
        );"""

    __tablename__ = "users"
    userid = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(100), nullable=False, unique=True)


class UserAuth(UserBase):  # 用户登录信息
    """
    table:
        create table users (
            userid int primary key,
            username varchar(100) unique not null,
            user_password varchar(32) not null
        );"""

    user_password = Column(String(32), nullable=False)


class DishesBase(Base):  # 菜品基本信息
    """
    table:
        create table dishes (
            dishid int primary key auto_increment,
            dishname varchar(100) unique not null,
            describe varchar(255),
            price float not null,
            shopname varchar(100) not null,
            floor int not null
        );
    """

    __tablename__ = "dishes"
    dishid = Column(Integer, primary_key=True, autoincrement=True)
    dishname = Column(String(100), nullable=False, unique=True)
    describe = Column(String(255))
    price = Column(Float, nullable=False)
    shopname = Column(String(100), nullable=False)
    floor = Column(Integer, nullable=False)


class Session(Base):  # 用户登录状态
    """
    table:
        create table session (
        sessionid varchar(32) primary key,
        userid int not null
        foreign key (userid) references users(userid)
        );
    """

    __tablename__ = "session"
    sessionid = Column(String(32), primary_key=True)
    userid = Column(Integer, ForeignKey("users.userid"))
    user = relationship("UserBase")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
