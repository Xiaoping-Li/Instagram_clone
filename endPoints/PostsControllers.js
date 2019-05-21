const Posts = require('../models/Post');

module.exports = {
    getAll: () => {
        return Posts.find();
    },

    getByOwner: (owner) => {
        return owner ? Posts.find({owner}) : null;
    },

    insert: (newPost) => Posts.create(newPost),

    update: (id, updates) => Posts.findByIdAndUpdate(id, updates, {new: true}),

    delete: (id) => Posts.findByIdAndDelete(id),
};