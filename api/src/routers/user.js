const express = require("express");
const { verify, register, login } = require("./middleware/auth");
const dao = require("../db/dao");
const bcrypt = require("bcrypt");
const { databaseURL, saltRounds } = require("../config");

const userRouter = express.Router();
dao.setURL(databaseURL);

userRouter.get("/users", verify, (req, res, next) => {
    dao.all("user")
        .then(data => res.json(data.map(({ username, admin }) => { username, admin })))
        .catch(err => next(err));
})

userRouter.get("/user/:id", verify, (req, res, next) => {
    dao.get("user", req.params.id)
        .then(({ username, admin }) => res.json({ username, admin }))
        .catch(err => next(err));
})

userRouter.post("/user/add", verify, (req, res, next) => {
    if (req.user.admin) {
        const { username, password, admin } = req.body;
        const user = { username, password, admin };
        register(user).then(({ id }) => res.json(id));
    } else {
        next(new Error("You need to be admin"));
    }
})
userRouter.post("/login", (req, res, next) => {
    const { username, password } = req.body;
    login({ username, password }).then(token => {
        if (token) {
            res.json(token)
        } else {
            next(new Error("Invalid username or password"));
        }
    }).catch(err => next(err));
})

module.exports = userRouter;