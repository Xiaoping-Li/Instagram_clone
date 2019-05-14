const express = require('express');
const UserRouter = express.Router();
const users = require('./UsersController');
const Users = require('../models/User');

/****** API Endpoints for Users ********/
// UserRouter.get('', (req, res) => {
//     users
//         .getAll()
//         .then(result => res.status(200).json(result))
//         .catch(err => console.log(err));   
// });

UserRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    Users
        .findById(id)
        .populate('requests')
        .then(result => {
            const user = {};
            user.requests = result.requests;
            user.friends = result.friends;
            res.status(201).json(user);
        })
        .catch(err => console.log(err));
});

UserRouter.get('', (req, res) => {
    const {username}  = req.query;
    users
        .getByUsername(username)
        .then(result => {
            const list = result.map(item => {
                const modified = {};
                modified.id = item._id;
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