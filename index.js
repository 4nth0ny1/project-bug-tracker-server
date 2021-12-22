const express = require('express');
const mysql = require('mysql2');
const cors = require("cors");

// add cors 
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    password: "@f133tAdmin",
    database: "login",
});

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("INSERT INTO users (username, password) VALUES (?,?)",
        [
            username, 
            password
        ], 
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send('values inserted');
            }
        }
    );
});

app.listen(3001, () => {
    console.log('running server');
})