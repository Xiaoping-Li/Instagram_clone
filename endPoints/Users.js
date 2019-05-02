const express = require('express');
const Users = require('../models/User');
const UserRouter = express.Router();

/****** API Endpoints for Users ********/
UserRouter.get('', (req, res) => {
    Users
        .find()
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));   
});

UserRouter.get('/:email', (req, res) => {
    const {email}  = req.params;
    Users
        .find({ email })
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
});

UserRouter.post('', (req, res) => {
    const newUser = req.body;
    Users
        .create(newUser)
        .then(result => res.status(201).json(result))
        .catch(err => console.log(err));
});

UserRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;
    Users
        .findByIdAndUpdate(id, update, {new: true})
        .then(result => res.status(203).json(result))
        .catch(err => console.log(err));
});

UserRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    Users
        .findByIdAndDelete(id)
        .then(result => res.status(201).json(result))
        .catch(err => console.log(err));
});

module.exports = UserRouter;