const Posts = require('../models/Post');

module.exports = {
    getAll: () => {
        return Posts.find();
    },

    getById: (id) => Posts.findById({ _id: id }),

    getByOwners: (owners) => {
        return Posts.find({owner: { $in: owners}}).sort('-createAt').limit(20);
    },

    insert: (newPost) => Posts.create(newPost),

    update: (id, updates) => Posts.findByIdAndUpdate(id, updates, {new: true}),

    delete: (id) => Posts.findByIdAndDelete(id),

    insertComment: (id, comment) => Posts.updateOne({ _id: id }, { $push: { comments: comment }}),

    addLike: (postID, userID) => Posts.updateOne({ _id: postID }, { $push: { likes: userID }}),
};