const express = require('express');
const mongoose = require('mongoose');

const server = express();


// Database Config
const db = require('./config/keys_dev').mongoURI;

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server listen on ${PORT}`));