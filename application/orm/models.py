from sqlalchemy import Column, Integer, String, Float, ARRAY
# from sqlalchemy import ForeignKey
# from sqlalchemy.orm import declarative_base, relationship
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker

from application.orm.database import Base
# from application.orm.database import SessionLocal


class UserBase(Base):  # 用户基本信息
    """
    table:
        create table users (
            userid int primary key auto_increment,
            username varchar(100) unique not null,
            useremail varchar(100) unique not null,
            useravatar varchar(255),
            userappetite float,
            userflavor array(string),
            user_password varchar(32) not null
        );
    """

    __tablename__ = "users"
    userid = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(100), nullable=False, unique=True)
    useremail = Column(String(100), nullable=False, unique=True)
    useravatar = Column(String(255))
    userappetite = Column(Float)
    userflavor = Column(ARRAY(String))


class UserAuth(UserBase):  # 用户登录信息
    """
    table:
        create table users (
            userid int primary key auto_increment,
            username varchar(100) unique not null,
            useremail varchar(100) unique not null,
            useravatar varchar(200) not null,
            userappetite float,
            userflavoe array(string),
            user_password varchar(32) not null
        );
    """
    user_password = Column(String(100), nullable=False)


class DishesBase(Base):  # 菜品基本信息
    """
    table:
        create table dishes (
            dishid int primary key auto_increment,
            dishname varchar(100) unique not null,
            pic varchar(255),
            describe varchar(255),
            price float not null,
            shopname varchar(100) not null,
            floor int not null,
            flavor array(string),
            satiety int not null,
            vegetables int not null,
            meat int not null,
            # type varchar(100) not null
        );
    """

    __tablename__ = "dishes"
    dishid = Column(Integer, primary_key=True, autoincrement=True)
    dishname = Column(String(100), nullable=False, unique=True)
    pic = Column(String(255))
    describe = Column(String(255), nullable=False)
    price = Column(Float, nullable=False)
    shopname = Column(String(100), nullable=False)
    floor = Column(Integer, nullable=False)
    flavor = Column(ARRAY(String))
    satiety = Column(Integer, nullable=False)
    vegetables = Column(Integer, nullable=False)
    meat = Column(Integer, nullable=False)
    # type = Column(String(100), nullable=False)
