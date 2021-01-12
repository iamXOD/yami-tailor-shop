const express = require("express");
const auth = require("./middleware/auth");
const dao = require("../db/dao");
const { databaseURL } = require("../config");

const actorRouter = express.Router();
dao.setURL(databaseURL);

actorRouter.get("/actors", auth, (req, res) => {
    dao.all("actor").then(data => res.json(data))
        .catch(err => next(err));
})

actorRouter.get("/actor/:id", auth, (req, res) => {
    dao.get("actor", req.params.id).then(data => res.json(data))
        .catch(err => next(err));
})

actorRouter.post("/actor/add", auth, (req, res, next) => {
    dao.insert("actor", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

actorRouter.post("/actor/update", auth, (req, res, next) => {
    dao.update("actor", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

actorRouter.get("/actor/delete/:id", auth, (req, res, next) => {
    dao.remove("actor", req.params.id).then(data => res.json(data))
        .catch(err => next(err));
})

module.exports = actorRouter;