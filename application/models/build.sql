create table users (
userid int primary key,
username varchar(100) unique, 
user_password varchar(32)
);

create table dishes (
dishid int primary key,
dishname varchar(100) unique not null,
describe varchar(255),
price float not null,
shopname varchar(100) not null,
floor int not null
);

create table session (
sessionid varchar(32) primary key,
userid int not null
foreign key (userid) references users(userid)
);