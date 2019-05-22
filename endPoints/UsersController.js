const Users = require('../models/User');


module.exports = {
    getAll: () => {
        return Users.find();
    },

    getByUsername: (username) => {
        return Users.find({username});
    },

    insert: (newUser) => Users.create(newUser),

    update: (id, updates) => Users.findByIdAndUpdate(id, updates, {new: true}),

    delete: (id) => Users.findByIdAndDelete(id),
};