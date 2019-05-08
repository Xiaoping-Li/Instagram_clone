const express = require('express');
const Posts = require('../models/Post');
const PostRouter = express.Router();

/****** API Endpoints for Posts ********/
// PostRouter.get('', (req, res) => {
//     Posts
//         .find()
//         .then(result => res.status(200).json(result))
//         .catch(err => console.log(err));   
// });

PostRouter.get('/:owner', (req, res) => {
    const {owner}  = req.params;
    Posts
        .find({ owner })
        .populate('owner', 'username thumbnail')
        .sort('-createAt')
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
});

PostRouter.post('', (req, res) => {
    const newPost = req.body;
    Posts
        .create(newPost)
        .then(post => res.status(201).json({success: true, post}))
        .catch(err => console.log(err));
});

PostRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;
    Posts
        .findByIdAndUpdate(id, update, {new: true})
        .then(result => res.status(203).json(result))
        .catch(err => console.log(err));
});

PostRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    Posts
        .findByIdAndDelete(id)
        .then(result => res.status(201).json(result))
        .catch(err => console.log(err));
});



module.exports = PostRouter;