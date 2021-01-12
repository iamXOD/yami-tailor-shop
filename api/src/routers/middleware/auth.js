const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { secret, databaseURL, saltRounds } =
require("../../config");
const dao = require("../../db/dao");
dao.setURL(databaseURL);

verify = function(request, res, next) {
    let token = request.body.token ||
        request.query.token ||
        request.headers['x-access-token'] ||
        request.cookies.token;
    if (token && token != "null") {
        request.user = jwt.verify(token, secret);
        next();
    } else { next(new Error("You must authenticate first")) }
}

register = function({ username, password, admin = false }) {
    return dao.getUser(username).then(user => {
        if (user) { throw new Error("username already in use"); }
        return bcrypt.hash(password, saltRounds);
    }).then((salted_password) => {
        return dao.insert("user", {
            username,
            salted_password,
            admin: Number(admin)
        });
    });
}

login = function({ username, password }) {
    return dao.getUser(username).then(user => {
        return bcrypt.compare(password, user.salted_password)
            .then(check => {
                if (check) { return jwt.sign(user, secret) }
                throw new Error("Wrong username or password");
            });
    });
}

module.exports = {
    verify,
    register,
    login
}