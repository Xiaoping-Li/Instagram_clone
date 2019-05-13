const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Friend Schema
const FriendSchema = new Schema({
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
        enum: ['requested', 'pending', 'friends'],
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

const FriendModel = mongoose.model('friend', FriendSchema);

module.exports = FriendModel;