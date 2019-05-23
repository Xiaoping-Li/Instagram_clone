const express = require('express');
const FriendRouter = express.Router();
const FriendRequests = require('../models/FriendRequest');
const Users = require('../models/User');

// FriendRouter.get('', (req, res) => {
//     FriendRequests
//         .find()
//         .then(result => res.status(200).json(result))
//         .catch(err => console.log(err));
// });

FriendRouter.get('', (req, res) => {
    FriendRequests
        .find({ sender: req.query.sender, recipient: req.query.recipient })
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
});

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

            const senderPromise = Users.updateOne({ _id: sender.sender }, { $push: { requests: sender._id}});

            const recipientPromise = Users.updateOne({ _id: recipient.sender }, { $push: { requests: recipient._id}});

            return Promise.all([senderPromise, recipientPromise]);
        })
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
});

FriendRouter.put('', (req, res) => {
    const senderID = req.query.sender;
    const recipientID = req.query.recipient;

    // Change friendRequest state from Pending to Friends
    // Save recipientID to sender's friends' list
    const senderPromise = FriendRequests
        .updateOne({ sender: senderID, recipient: recipientID }, { status: 'Friends' })
        .then(result => {
            if (result.ok) {
                return Users.updateOne({ _id: senderID }, { $push: { friends: recipientID }});
            }
        });

    // Change friendRequest state from Requested to Friends
    // Save senderID to recipient's friends' list 
    const recipientPromise = FriendRequests
        .updateOne({ sender: recipientID, recipient: senderID }, { status: 'Friends' })
        .then(result => {
            if (result.ok) {
                return Users.updateOne({ _id: recipientID }, { $push: { friends: senderID }});
            }
        });

    Promise.all([senderPromise, recipientPromise])
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
});

FriendRouter.delete('', (req, res) => {
    const senderID = req.query.sender;
    const recipientID = req.query.recipient;

    const senderPromise = FriendRequests
        .findOneAndDelete({ sender: senderID, recipient: recipientID })
        .then(result => {
            if(result.status === 'Friends') {
                return Users
                    .updateOne(
                        { _id: senderID }, 
                        { $pull: { friends: recipientID, requests: result._id }},
                        {multi: true}
                    );
            } else {
                return Users.updateOne({ _id: senderID }, { $pull: { requests: result._id }});
            }
        });

    const recipientPromise = FriendRequests
        .findOneAndDelete({ sender: recipientID, recipient: senderID })
        .then(result => {
            if(result.status === 'Friends') {
                return Users
                    .updateOne(
                        { _id: recipientID }, 
                        { $pull: { friends: senderID, requests: result._id }},
                        {multi: true}
                    );
            } else {
                return Users
                    .updateOne({ _id: recipientID }, { $pull: { requests: result._id }});
            }
        })

    Promise.all([senderPromise, recipientPromise])
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
});

module.exports = FriendRouter;