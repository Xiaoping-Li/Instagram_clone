const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create FriendRequest Schema
const FriendRequestSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    status: {
        type: String,
        enum: ['Requested', 'Pending', 'Friend'],
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

const FriendRequestModel = mongoose.model('friendRequest', FriendRequestSchema);

module.exports = FriendRequestModel;