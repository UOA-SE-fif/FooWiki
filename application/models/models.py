from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()  # 创建数据库对象


class UserBase(db.Model):  # 用户基本信息
    """
    table:
        create table users (
            userid int primary key auto_increment,
            username varchar(100) unique not null,
            user_password varchar(32) not null
        );"""

    __tablename__ = "users"
    userid: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)


class UserAuth(UserBase):  # 用户登录信息
    """
    table:
        create table users (
            userid int primary key,
            username varchar(100) unique not null,
            user_password varchar(32) not null
        );"""

    user_password: Mapped[str] = mapped_column(String(32), nullable=False)


class DishesBase(db.Model):  # 菜品基本信息
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
    dishid: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    dishname: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    describe: Mapped[str] = mapped_column(String(255))
    price: Mapped[float] = mapped_column(Integer, nullable=False)
    shopname: Mapped[str] = mapped_column(String(100), nullable=False)
    floor: Mapped[int] = mapped_column(Integer, nullable=False)


class Session(db.Model):  # 用户登录状态
    """
    table:
        create table session (
        sessionid varchar(32) primary key,
        userid int not null
        foreign key (userid) references users(userid)
        );
    """

    __tablename__ = "session"
    sessionid: Mapped[str] = mapped_column(String(32), primary_key=True)
    userid: Mapped[int] = mapped_column(Integer, nullable=False)
