const Users = require('../models/User');


module.exports = {
    getAll: () => {
        return Users.find();
    },

    getByUsername: (username) => {
        return username ? Users.find({username}) : null;
    },

    insert: (newUser) => Users.create(newUser),

    update: (id, updates) => Usres.findByIdAndUpdate(id, updates, {new: true}),

    delete: (id) => Users.findByIdAndDelete(id),
};