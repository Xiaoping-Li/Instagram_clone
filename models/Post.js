const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Post Schema
const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    parentID: Number,
    uri: {
        type: String,
        required: true,
    },
    desc: String,
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users',
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users',
            },
            text: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now,
            }
        }
    ],
    createAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export PostModel
const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;