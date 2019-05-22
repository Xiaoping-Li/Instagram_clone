const Posts = require('../models/Post');

module.exports = {
    getAll: () => {
        return Posts.find();
    },

    // getByOwner: (owner) => {
    //     return Posts.find({owner});
    // },

    getByOwners: (owners) => {
        return Posts.find({owner: { $in: owners}});
    },

    insert: (newPost) => Posts.create(newPost),

    update: (id, updates) => Posts.findByIdAndUpdate(id, updates, {new: true}),

    delete: (id) => Posts.findByIdAndDelete(id),
};