const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'User Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email or Phone number is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'], 
    },
    thumbnail: String,
    createAt: {
        type: Date,
        default: Date.now,
    },
    friends: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        }
    }], 
});

// Create User Model
const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
