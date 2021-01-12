const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function(request, res, next) {
    let token = request.body.token || request.query.token || request.headers['x-access-token'] || request.cookies.token;

    if (token && token != "null") {
        request.user = jwt.verify(token, secret);
    } else {
        request.user = null;
    }

    next();
}