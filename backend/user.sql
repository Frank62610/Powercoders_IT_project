DROP DATABASE IF EXISTS Username_and_Password;
CREATE DATABASE Username_and_Password;
USE Username_and_Password;




CREATE TABLE cred (
username VARCHAR(50),
    pass VARCHAR(50)
);

CREATE TABLE flag (
flag VARCHAR(50)
);


INSERT INTO cred (username, pass) VALUES
('admin', 'password123'),
('user', 'letmein');

INSERT INTO flag (flag) VALUES
('sql_injection');
