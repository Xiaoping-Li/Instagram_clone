const express = require('express');
// const posts = require('./PostsControllers');
const FriendRouter = express.Router();
const FriendRequests = require('../models/FriendRequest');

FriendRouter.post('/friends', (req, res) => {
    const newRequest = req.body;
    FriendRequests
        .create(newRequest)
        .then(result => res.status(201).json(result))
        .catch(err => console.log(err));
});

module.exports = FriendRouter;