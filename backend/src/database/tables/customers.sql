-- -- -- -- create DATABASE tourManagementSystem
-- -- -- -- use tourManagementSystem
-- select * from Users


create TABLE Users (
    userID VARCHAR(300) not null PRIMARY KEY,
    userName VARCHAR(255) not null,
    email VARCHAR(255) not null UNIQUE,
    password VARCHAR(255) not null,
    phone_no VARCHAR (250) UNIQUE, 
    role varchar(20) DEFAULT 'customer',
    Welcomed bit DEFAULT 0,
);
alter table Users
drop COLUMN AssignedProjectID

-- -- -- --  
-- -- -- drop table Users

--created the admin
update Users 
set role = 'admin'
where email = 'michealvenum007@gmail.com'

delete from Users 
where email = 'mikeveum9@gmail.com'



