const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Post Schema
const PostSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    uri: {
        type: String,
        required: [true, 'Please provide image link'],
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
            body: {
                type: String,
                required: [true, 'Content required'],
            },
        }
    ],
    createAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export PostModel
const PostModel = mongoose.model('post', PostSchema);

module.exports = PostModel;