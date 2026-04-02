const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '321nieves', // <-- change this
    database: 'gym_booking_system'
});

db.connect(err => {
    if (err) {
        console.error("Connection error:", err);
        return;
    }
    console.log("Connected to MySQL");
});


// ✅ ROOT TEST (optional)
app.get('/', (req, res) => {
    res.send("Server is running!");
});


// ✅ Get schedules by facility
app.get('/schedules/:facility_id', (req, res) => {
    const { facility_id } = req.params;

    const sql = `
    SELECT s.schedule_id, s.start_time, s.end_time
    FROM Schedules s
    WHERE s.facility_id = ?
    `;

    db.query(sql, [facility_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ error: err });
        }

        console.log("Schedules:", result);
        res.json(result);
    });
});


// ✅ Book
app.post('/book', (req, res) => {
    const { user_id, schedule_id } = req.body;

    const sql = `
    INSERT INTO Bookings (user_id, schedule_id, booking_date, booking_status)
    VALUES (?, ?, CURDATE(), 'Active')
    `;

    db.query(sql, [user_id, schedule_id], (err) => {
        if (err) {
            console.error(err);
            return res.json({ error: err });
        }

        res.json({ message: "Booking successful!" });
    });
});


// ✅ Cancel
app.put('/cancel', (req, res) => {
    const { user_id, schedule_id } = req.body;

    const sql = `
    UPDATE Bookings
    SET booking_status = 'Cancelled'
    WHERE user_id = ? AND schedule_id = ?
    `;

    db.query(sql, [user_id, schedule_id], (err) => {
        if (err) {
            console.error(err);
            return res.json({ error: err });
        }

        res.json({ message: "Booking cancelled!" });
    });
});


// ✅ Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});