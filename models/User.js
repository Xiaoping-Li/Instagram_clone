const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({

});

// Create User Model
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;