const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();

const Users = require('./models/User');
const Posts = require('./models/Post');

server.use(bodyParser.json());
server.use(cors());

const PORT = process.env.PORT || 5000;

// Database Config
const db = require('./config/keys_dev').mongoURI;

/****** API Endpoints for Users ********/
server.get('/users', (req, res) => {
    Users
        .find()
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));   
});

server.get('/users/:email', (req, res) => {
    const {email}  = req.params;
    Users
        .find({ email })
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
});

server.post('/users', (req, res) => {
    const newUser = req.body;
    Users
        .create(newUser)
        .then(result => res.status(201).json(result))
        .catch(err => console.log(err));
});

server.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;
    Users
        .findByIdAndUpdate(id, update, {new: true})
        .then(result => res.status(203).json(result))
        .catch(err => console.log(err));
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    Users
        .findByIdAndDelete(id)
        .then(result => res.status(201).json(result))
        .catch(err => console.log(err));
});


/****** API Endpoints for Posts ********/
server.get('/posts', (req, res) => {
    Posts
        .find()
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));   
});

server.get('/posts/:owner', (req, res) => {
    const {owner}  = req.params;
    Posts
        .find({ owner })
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
});

server.post('/posts', (req, res) => {
    const newPost = req.body;
    Posts
        .create(newPost)
        .then(result => res.status(201).json(result))
        .catch(err => console.log(err));
});

server.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;
    Posts
        .findByIdAndUpdate(id, update, {new: true})
        .then(result => res.status(203).json(result))
        .catch(err => console.log(err));
});

server.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    Posts
        .findByIdAndDelete(id)
        .then(result => res.status(201).json(result))
        .catch(err => console.log(err));
});





// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

mongoose.set('useCreateIndex', true);

server.listen(PORT, () => console.log(`server listen on ${PORT}`));