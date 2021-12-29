const express = require('express');
const mysql = require('mysql2');
const cors = require("cors");
require('dotenv').config()

const bcrypt = require('bcrypt')
const saltRounds = 10

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

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err)
        } else {
            db.query(
                "INSERT INTO users (username, password) VALUES (?,?)",
                [ username, hash ], 
                (err, result) => {
                    console.log(err);
                }
            }
        );
    });
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE username = ?",
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