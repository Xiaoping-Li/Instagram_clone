const express = require('express');
const posts = require('./PostsControllers');
const PostRouter = express.Router();

/****** API Endpoints for Posts ********/
PostRouter.get('', (req, res) => {
    posts
        .getAll()
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));   
});

PostRouter.get('', (req, res) => {
    const {owner}  = req.query;
    posts
        .getByOwner(owner)
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



module.exports = PostRouter;