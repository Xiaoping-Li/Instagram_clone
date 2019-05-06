const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const server = express();

const UserRouter = require('./endPoints/Users');
const PostRouter = require('./endPoints/Posts');
const Users = require('./models/User');

server.use(bodyParser.json());
server.use(cors({
    origin: true,
    credentials: true,
}));

const PORT = process.env.PORT || 5000;

// Database Config
const db = require('./config/keys_dev').mongoURI;

// Using bcrypt to hash plain password and save hashed password to database
server.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 11, (err, hash) => {
        if (err) {
            res.status(422).json({"error": err});
        } else {
            const newUser = req.body;
            newUser.password = hash;
            Users
                .create(newUser)
                .then(result => res.status(201).json(result))
                .catch(err => console.log(err));
        }
    });
});

// When user try to login, check the password first
server.post('/signin', (req, res) => {

});

// When user logout of the app
server.post('/signout', (req, res) => {

});


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