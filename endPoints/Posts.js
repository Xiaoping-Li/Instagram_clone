const express = require('express');
const mongoose = require('mongoose');
const Users = require('../models/User');
const Posts = require('../models/Post');
const posts = require('./PostsControllers');
const PostRouter = express.Router();

/****** API Endpoints for Posts ********/
// PostRouter.get('', (req, res) => {
//     posts
//         .getAll()
//         .then(result => res.status(200).json(result))
//         .catch(err => console.log(err));   
// });

PostRouter.get('', (req, res) => {
    const {owner}  = req.query;

    Users
        .findById(owner)
        .then(user => {
            const owners = user.friends;
            owners.push(owner);
            return posts
                .getByOwners(owners)
                .populate('owner', 'username thumbnail _id')
                .populate({ path: 'comments', populate: { path: 'user', select: 'username thumbnail _id'}});
        })
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));  
});

PostRouter.post('', (req, res) => {
    const newPost = req.body;
    posts
        .insert(newPost)
        .then(post => res.status(201).json({success: true, post}))
        .catch(err => console.log(err));
});

PostRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;
    posts
        .update(id, update, {new: true})
        .then(result => res.status(203).json(result))
        .catch(err => console.log(err));
});

PostRouter.delete('', (req, res) => {
    const { id } = req.query;
    posts
        .delete(id)
        .then(result => res.status(201).json({success: true, result}))
        .catch(err => console.log(err));
});

/****** API Endpoints for comments for corresponding post ********/
PostRouter.put('/comments', (req, res) => {
    const { id } = req.query;
    const comment = {
        user: mongoose.Types.ObjectId(req.body.user),
        body: req.body.body,
    };
    // const comment = req.body;
    Posts
        .update({ _id: mongoose.Types.ObjectId(id) }, { $push: { comments: comment }})
        .then(result => {
            console.log(result);
            res.status(200).json(result.ok);
        })
        .catch(err => console.log(err));
});


module.exports = PostRouter;