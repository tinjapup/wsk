# Tribe+

Tribe+ is a web application designed for tracking exercise activity.

## Features
- User authentication (login & registration)
- Activity tracking (add, edit & remove entries)
- Data visualization with Chart.js
- User profile management (change user information and password & delete account)

## API Endpoints
| Method | Endpoint             | Description                |
|--------|----------------------|----------------------------|
| GET    | `/api/activities`    | Fetch different activities |
| POST   | `/api/auth/login`    | Login                      |
| POST   | `/api/auth/me`       | Authentication             |
| POST   | `/api/auth/check`    | Confirm password           |
| GET    | `/api/entries`       | Fetch activity entries     |
| POST   | `/api/entries`       | Add new activity entry     |
| PUT    | `/api/entries`       | Update activity entry      |
| DELETE | `/api/entries`       | Delete activity entry      |
| GET    | `/api/users`         | Fetch user profile         |
| PUT    | `/api/users`         | Update user profile        |
| POST   | `/api/users`         | Add new user               |
| DELETE | `/api/users`         | Delete user                |
| PUT    | `/api/users/password`| Change password            |

## Technologies Used
- **Frontend:** HTML, CSS, Vite JS
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JWT, bcrypt
- **Data visualization:** Chart.js

- ## Known bugs

- Changing password does not work properly

## Screenshots

![Screenshot 2025-03-11 080933](https://github.com/user-attachments/assets/90848b2e-0f39-4b16-adbb-fe85eb7d1ab8)
![Screenshot 2025-03-11 082235](https://github.com/user-attachments/assets/9cb18920-54ed-4bd6-a63a-2ea8adc6e2dc)
![Screenshot 2025-03-11 081130](https://github.com/user-attachments/assets/7c68fa27-8dc1-43b2-b7b2-13be7e7ad037)

## Database Structure

![TribeDB](https://github.com/user-attachments/assets/e7a74053-194d-4751-82a7-93e68eb5808b)

## Localhost addresses

Frontend: http://localhost:5173/ 
Backend: http://localhost:3000/ 
