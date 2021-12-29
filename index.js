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
        } 
        db.query(
            "INSERT INTO users (username, password) VALUES (?,?)",
            [ username, hash ], 
            (err, result) => {
                console.log(err);
            }
        );
    });
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ?",
        username, 
        (err, result) => {
            if (err) {
                res.send({err: 'error before bcrypt'})
            } 
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password (error, response) => {
                    if (response) {
                        res.send(result)
                    } else {
                        res.send({ message: "Wrong user/pass combo" })
                    }
                })
            } else {
                res.send({message: "invalid user"});
            }
            }
    );
});

app.listen(3001, () => {
    console.log('running server');
})