const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();

const UserRouter = require('./endPoints/Users');
const PostRouter = require('./endPoints/Posts');

server.use(bodyParser.json());
server.use(cors());

const PORT = process.env.PORT || 5000;

// Database Config
const db = require('./config/keys_dev').mongoURI;


// Using Routers
server.use('/users', UserRouter);
server.use('/posts', PostRouter);

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

mongoose.set('useCreateIndex', true);

server.listen(PORT, () => console.log(`server listen on ${PORT}`));