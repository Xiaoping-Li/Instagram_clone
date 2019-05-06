// Middleware to validate if user log in
const validateUser = (req, res, next) => {
    if (!req.session.email) {
        res.json({ error: "User is not logged in"});
        return;
    }
    next();
}


module.exports = {
    validateUser,
}