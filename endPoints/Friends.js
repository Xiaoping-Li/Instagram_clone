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

    // Create two requests in the db
    FriendRequests
        .create(senderRequest, recipientRequest)
        .then(result => {
            // After createing successfully, save the requests' ids to corresponding user requests list
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

FriendRouter.put('', (req, res) => {
    const senderID = req.query.sender;
    const recipientID = req.query.recipient;

    FriendRequests
        .updateOne({ sender: senderID, recipient: recipientID }, { status: 'Friends' })
        .then(result => {
            Users
                .update({ _id: senderID }, { $push: { friends: recipientID }})
                .then(result => res.status(200).json(result.ok))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

    FriendRequests
        .updateOne({ sender: recipientID, recipient: senderID }, { status: 'Friends' })
        .then(result => {
            Users
                .update({ _id: recipientID }, { $push: { friends: senderID }})
                .then(result => res.status(200).json(result.ok))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

module.exports = FriendRouter;