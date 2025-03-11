-- create database
DROP DATABASE IF EXISTS TribeDB;
CREATE DATABASE TribeDB;
Use TribeDB;

-- create a table for activities
CREATE TABLE Activities (
	activity_id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL UNIQUE,
	met DECIMAL(5,2)
);

-- insert activities
INSERT INTO Activities (name, met) VALUES
    ('Jogging', 7.0),
    ('Swimming', 6.0),
    ('Cycling (moderate)', 4.0),
    ('Cycling (vigorous)', 8.0),
    ('Walking (brisk)', 4.3),
    ('Walking (moderate)', 3.9),
    ('Running', 9.8),
    ('Jumping rope', 12.0),
    ('Hiking', 6.0),
    ('Dancing (moderate)', 4.5),
    ('Yoga', 2.5),
    ('Strength training', 3.0),
    ('Rowing (moderate)', 6.0),
    ('Tennis (singles)', 7.3),
    ('Basketball (competitive)', 8.0);

SELECT * FROM Activities;

-- create a table for users
CREATE TABLE Users (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	user_level VARCHAR(50) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	weight DECIMAL(5,2),
	height DECIMAL(5,2),
	CONSTRAINT CHK_UserLevel CHECK (user_level = 'user' OR user_level = 'admin')
);

-- create a table for diary entries
CREATE TABLE Entries (
	entry_id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT,
	entry_date DATE NOT NULL,
	activity VARCHAR(100),
	name VARCHAR(70),
	weight DECIMAL(5,2),
	sleep_hours INT,
	notes TEXT,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- create a table for comments
CREATE TABLE Comments (
	comment_id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT,
	entry_id INT,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES Users(user_id),
	FOREIGN KEY (entry_id) REFERENCES Entries(entry_id)
);

ALTER TABLE entries DROP COLUMN sleep_hours;
ALTER TABLE entries ADD COLUMN duration INT NOT NULL;
ALTER TABLE Users ADD COLUMN first_name VARCHAR(50) NOT NULL;
ALTER TABLE Users ADD COLUMN last_name VARCHAR(50) NOT NULL;
DROP TABLE Comments;
