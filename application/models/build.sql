create database if not exists `foowikidb`;
use `foowikidb`;
create table `users` (
    `userid` int primary key auto_increment,
    `username` varchar(100) unique not null, 
    `user_password` varchar(100) not null
);

create table `dishes` (
    `dishid` int primary key auto_increment,
    `dishname` varchar(100) unique not null,
    `describe` varchar(255),
    `price` float not null,
    `shopname` varchar(100) not null,
    `floor` int not null,
    `type` varchar(100) not null,
    `satiety` int not null,
    `vegetables` int not null,
    `meat` int not null
);

create table `session` (
    `sessionid` varchar(100) primary key,
    `userid` int not null,
    foreign key (userid) references users(userid)
);