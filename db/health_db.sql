-- create database
DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;
USE HealthDiary;

-- create a table for users
CREATE TABLE Users (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	user_level VARCHAR(50) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT CHK_UserLevel CHECK (user_level = 'user' OR user_level = 'admin')
);

-- create a table for diary entries
CREATE TABLE DiaryEntries (
	entry_id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT,
	entry_date DATE NOT NULL,
	mood VARCHAR(50),
	weight DECIMAL(5,2),
	sleep_hours INT,
	notes TEXT,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- create a table for users' goals
CREATE TABLE Goals (
	goal_id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	title VARCHAR(80),
	description TEXT,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- inserting mock data

-- users
INSERT INTO Users (username, password, email, user_level) VALUES
	('john_doe91', 'SecurePass123', 'john.doe91@example.com', 'user'),
	('emma_smith', 'EmmaRocks2025', 'emma.smith@gmail.com', 'user'),
	('michael_lee88', 'MikeStrong88!', 'michael.lee88@yahoo.com', 'user');

-- diary entries
INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
	(1, '2025-02-02', 'Relaxed', 60.3, 7.5, 'Had a peaceful day, did some meditation', '2025-02-03 08:15:10'),
	(1, '2025-02-03', 'Energetic', 60.2, 6, 'Worked out in the morning, feeling great', '2025-02-04 07:50:23'),
	(1, '2025-02-04', 'Tired', 60.1, 4, 'Didn’t sleep well, felt sluggish', '2025-02-05 09:30:45'),
	(2, '2025-02-01', 'Happy', 72.5, 8, 'Spent time with family, great day', '2025-02-02 18:45:30'),
	(2, '2025-02-02', 'Stressed', 72.4, 5, 'Too much work, feeling overwhelmed', '2025-02-03 09:10:55'),
	(2, '2025-02-03', 'Neutral', 72.3, 6.5, 'Nothing special happened today', '2025-02-04 10:05:12'),
	(3, '2025-01-30', 'Excited', 65.0, 7, 'Got a new job offer, feeling great!', '2025-01-31 12:20:37'),
	(3, '2025-01-31', 'Sick', 64.8, 9, 'Had a fever, stayed in bed all day', '2025-02-01 14:05:19'),
	(3, '2025-02-01', 'Motivated', 64.9, 6, 'Started a new workout routine!', '2025-02-02 08:40:22');

-- goals
INSERT INTO Goals (start_date, end_date, title, description, created_at, user_id) VALUES
	('2025-02-01', '2025-03-01', 'Lose 5kg', 'Follow a healthy diet and exercise regularly to lose 5kg.', '2025-02-01 10:15:00', 1),
	('2025-03-01', '2025-06-01', 'Meditate daily', 'Practice mindfulness meditation for at least 10 minutes every day.', '2025-03-01 07:00:00', 1),
	('2025-03-15', '2025-05-15', 'Improve sleep quality', 'Establish a consistent sleep schedule and avoid screens before bed.', '2025-03-15 20:10:00', 2),
	('2025-02-05', '2025-04-05', 'Run 5km without stopping', 'Train gradually to improve endurance and run 5km non-stop.', '2025-02-05 08:30:00', 2),
	('2025-02-10', '2025-02-28', 'Drink more water', 'Drink at least 2 liters of water per day to stay hydrated.', '2025-02-10 09:45:00', 3),
	('2025-02-10', '2025-02-28', 'Eat more greens', 'Eat at least 500 grams of vegetables every day.', '2025-02-10 09:45:00', 3);

-- examples about use cases

-- updating data
UPDATE Users SET user_level = 'admin' WHERE user_id = 1;
UPDATE DiaryEntries SET notes = 'In the beginning of the day I felt overwhelmed, but during the day I calmed down' WHERE user_id = 2 AND entry_id = 2;
UPDATE Goals SET end_date = '2025-04-03' WHERE user_id = 3 AND goal_id = 5;

-- deleting data
DELETE FROM DiaryEntries WHERE user_id = 1 AND entry_id = 1;

-- querying data
SELECT * FROM Users WHERE user_level = 'user';
SELECT * FROM Goals WHERE user_id = 2;
SELECT DiaryEntries.*, Users.username FROM DiaryEntries JOIN Users ON DiaryEntries.user_id = Users.user_id;
