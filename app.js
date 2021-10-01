const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb+srv://ayonrakib:ayonrakib@cluster0.54ijf.mongodb.net/test?retryWrites=true&w=majority");

const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.on('open', () => console.log("connection established"));

app.listen(4000, () => console.log("server started"));