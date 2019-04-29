const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        validate: passwordValidator,
        msg: 'password too short, at least 4 char', 
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    posts: [],
    friends: [],
});

// Create User Model
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

// Create a Validator for password, could provide more rules inside this funciton
const passwordValidator = pw => {
    return pw.length >= 4;
};