create table users (
userid int primary key auto_increment,
username varchar(100), 
pw varchar(100)
);

create table dishes (
dishid int primary key auto_increment,
dishname varchar(100),
price float,
shopname varchar(100),
floor int
);
