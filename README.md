# Sports Booking System

A full-stack web application that allows users to browse sports facilities, view available time slots, and make or cancel bookings.  
Built using **HTML**, **CSS**, **JavaScript**, **Node.js**, **Express**, and **MySQL**.

---

## Features

### Frontend
- Select sports facilities (Tennis, Soccer, Basketball, Swimming)
- View available time slots dynamically from the database
- Book a schedule with one click
- Cancel an existing booking
- Clean, responsive UI

### Backend (Node.js + Express)
- REST API for schedules, booking, and cancellation
- Prevents double-booking
- Returns only available time slots
- Updates booking and schedule status

### Database (MySQL)
Relational schema with:
- **Users**
- **Facilities**
- **Schedules**
- **Bookings**

Includes foreign keys and sample data.

---

## 📂 Project Structure
/project-folder
│── index.html
│── server.js
│── package.json
│── package-lock.json
│── .gitignore
│── /node_modules
│── /images (optional)


---

## Technologies Used

| Layer | Technology |
|-------|------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express |
| Database | MySQL |
| Version Control | Git & GitHub |

---

## Installation & Setup

### 1 - Clone the repository
```bash
git clone https://github.com/Juan-M0/sports-booking-system.git
cd sports-booking-system
```

### 2 - Install dependencies
```bash
npm install
```

### 3 - Configure MySQL connection
Edit server.js and update:
```bash
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'YOUR_PASSWORD',
    database: 'gym_booking_system'
});
```

### 4 - Start the server
```bash
node server.js
```
You should see:
Server running on http://localhost:3000
Connected to MySQL

### 5 - Open the frontend
Simply open:
index.html
in your browser.

##  Database Schema
Users Table
```bash
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    role VARCHAR(10) NOT NULL
);
```
Facilities Table
```bash
CREATE TABLE Facilities (
    facility_id INT AUTO_INCREMENT PRIMARY KEY,
    facility_name VARCHAR(100) NOT NULL,
    facility_type VARCHAR(50),
    location VARCHAR(100),
    capacity INT
);

```

Schedules Table
```bash
CREATE TABLE Schedules (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    facility_id INT NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (facility_id) REFERENCES Facilities(facility_id)
);
```

Bookings Table
```bash
CREATE TABLE Bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    schedule_id INT NOT NULL UNIQUE,
    booking_date DATE,
    booking_status VARCHAR(20) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (schedule_id) REFERENCES Schedules(schedule_id)
);
```

## API Endpoints
GET /schedules/:facility_id
Returns available time slots for a facility.

POST /book
Body:
```bash
{
  "user_id": 1,
  "schedule_id": 3
}
```

PUT /cancel
```bash
{
  "user_id": 1,
  "schedule_id": 3
}
```
## UI Screenshot

![UI Screenshot](UI.png)

Author
Juan M.  
GitHub: https://github.com/Juan-M0

### Future Improvements
- User login & authentication
- Admin dashboard
- Email notifications
- Prevent booking past dates
- Mobile-friendly UI

