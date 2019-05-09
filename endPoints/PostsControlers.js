const Posts = require('../models/Post');

module.exports = {
    getAll: () => {
        return Posts.find();
    },

    getByOwner: (owner) => {
        if (owner) {
            return Posts
                    .find({ owner })
                    .sort('-createAt');
        } else {
            return null;
        }
    },

    insert: (newPost) => Posts.create(newPost),

    update: (id, updates) => Posts.findByIdAndUpdate(id, updates, {new: true}),

    delete: (id) => Posts.findByIdAndDelete(id),
};