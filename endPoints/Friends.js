const express = require('express');
// const posts = require('./PostsControllers');
const FriendRouter = express.Router();
const FriendRequests = require('../models/FriendRequest');
const Users = require('../models/User');

FriendRouter.get('', (req, res) => {
    FriendRequests
        .find()
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
})

FriendRouter.post('', (req, res) => {
    // Create two request the same time, change ID for sender and recipient, have different status
    const senderRequest = {};
    const recipientRequest = {};
    senderRequest.sender = req.query.sender;
    senderRequest.recipient = req.query.recipient;
    senderRequest.status = 'Requested';

    recipientRequest.sender = req.query.recipient;
    recipientRequest.recipient = req.query.sender;
    recipientRequest.status = 'Pending';


    FriendRequests
        .create(senderRequest, recipientRequest)
        .then(result => {
            const sender = result[0];
            const recipient = result[1];

            Users
                .update({ _id: sender.sender }, { $push: { requests: sender._id}})
                .then(result => res.status(200).json(result.ok))
                .catch(err => console.log(err));

            Users
                .update({ _id: recipient.sender }, { $push: { requests: recipient._id}})
                .then(result => res.status(200).json(result.ok))
                .catch(err => console.log(err));

            res.status(201).json(result);
        })
        .catch(err => console.log(err));
});

module.exports = FriendRouter;