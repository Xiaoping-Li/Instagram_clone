const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'User Name is required'],
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, 'Email or Phone number is required'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'], 
    },
    thumbnail: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2016/08/09/17/52/instagram-1581266_960_720.jpg',
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        }
    ], 
},
{ runSettersOnQuery: true });

// Create User Model
const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
