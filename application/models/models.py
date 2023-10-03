from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


Base = declarative_base()
# Base是所有数据库模型的基类。通过继承Base类，可以定义数据库模型类，并将其映射到数据库表。
engine = create_engine("mysql+pymysql://root:markyan20040903@localhost:3306/mydatabase")
# create_engine函数创建了一个数据库引擎对象，使用指定的数据库连接字符串
# 在create_engine中，您应该填写适当的数据库连接字符串来连接到您的数据库。数据库连接字符串的确切格式取决于您使用的数据库类型和驱动程序。
# 对于MySQL，engine = create_engine("mysql+pymysql://username:password@host:port/database")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# 创建了一个会话工厂，使用上述创建的数据库引擎对象作为参数。会话工厂用于创建数据库会话对象，用于执行数据库操作。


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

