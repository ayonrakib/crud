const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.on('open', () => console.log("connection established"));

app.listen(4000, () => console.log("server started"));