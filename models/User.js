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
        validate: passwordValidator,
        msg: 'password too short, at least 4 char', 
    },
    thumbnail: String,
    createAt: {
        type: Date,
        default: Date.now,
    },
    posts: [{type: Schema.Types.ObjectId, ref: 'post',}],
    friends: [{ type: Schema.Types.ObjectId, ref: 'user'}], 
});

// Create User Model
const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;

// Create a Validator for password, could provide more rules inside this funciton
const passwordValidator = pw => {
    return pw.length >= 4;
};