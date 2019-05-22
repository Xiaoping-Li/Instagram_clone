const Posts = require('../models/Post');

module.exports = {
    getAll: () => {
        return Posts.find();
    },

    getByOwners: (owners) => {
        return Posts.find({owner: { $in: owners}}).sort('-createAt').limit(5);
    },

    insert: (newPost) => Posts.create(newPost),

    update: (id, updates) => Posts.findByIdAndUpdate(id, updates, {new: true}),

    delete: (id) => Posts.findByIdAndDelete(id),
};