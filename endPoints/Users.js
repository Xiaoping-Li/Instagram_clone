const express = require('express');
const Users = require('../models/User');
const UserRouter = express.Router();
const users = require('./UsersController');

/****** API Endpoints for Users ********/
// UserRouter.get('', (req, res) => {
//     users
//         .getAll()
//         .then(result => res.status(200).json(result))
//         .catch(err => console.log(err));   
// });

UserRouter.get('', (req, res) => {
    const {username}  = req.query;
    users
        .getByUsername(username)
        .then(result => {
            console.log(result);
            const list = result.map(item => {
                const modified = {};
                modified.username = item.username;
                modified.thumbnail = item.thumbnail;
                return modified;
            });
            res.status(200).json(list);
        })
        .catch(err => console.log(err));
});

UserRouter.post('', (req, res) => {
    const newUser = req.body;
    users
        .insert(newUser)
        .then(result => res.status(201).json(result))
        .catch(err => console.log(err));
});

UserRouter.put('', (req, res) => {
    const { id } = req.query;
    const update = req.body;
    users
        .update(id, update, {new: true})
        .then(result => res.status(203).json(result))
        .catch(err => console.log(err));
});

UserRouter.delete('', (req, res) => {
    const { id } = req.query;
    users
        .delete(id)
        .then(result => res.status(201).json(result))
        .catch(err => console.log(err));
});

module.exports = UserRouter;