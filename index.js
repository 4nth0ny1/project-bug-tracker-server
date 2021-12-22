const express = require("express");
const mysql = require('mysql2');

const app = express();

app.use(express.json());

// const db = mysql.createConnection({
//     user: "root", 
//     host: 'localhost', 
//     password: "@f133tAdmin", 
//     database: "bugTrackerLogin",
// });

app.listen(3001, () => {
    console.log('running server');
})