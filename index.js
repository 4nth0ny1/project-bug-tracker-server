const express = require('express');
const mysql = require('mysql2');
const cors = require("cors");
require('dotenv').config()

// add cors 
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    password: process.env.DB_PASS,
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

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE username = ? AND password = ?",
        [
            username, 
            password
        ], 
        (err, result) => {
            if (err) {
                res.send({err: 'error bro'})
            } else {
                if (result.length > 0) {
                    res.send(result);
                } else {
                    res.send({message: "invalid username or password"});
                }
            }
        }
    );
});

app.listen(3001, () => {
    console.log('running server');
})