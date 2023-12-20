ALTER USER 'root'@'localhost' IDENTIFIED BY 'qwerty';
CREATE USER 'appUser'@'localhost' IDENTIFIED BY '12345678';
GRANT ALL PRIVILEGES ON tic-tac-toe.* TO 'appUser'@'localhost';
FLUSH PRIVILEGES;