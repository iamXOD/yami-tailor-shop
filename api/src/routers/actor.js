const express = require("express");
const { verify } = require("./middleware/auth");
const dao = require("../db/dao");
const { databaseURL } = require("../config");

const actorRouter = express.Router();
dao.setURL(databaseURL);

actorRouter.get("/actors", verify, (req, res) => {
    dao.all("actor").then(data => res.json(data))
        .catch(err => next(err));
})

actorRouter.get("/actor/:id", verify, (req, res) => {
    dao.get("actor", req.params.id).then(data => res.json(data))
        .catch(err => next(err));
})

actorRouter.post("/actor/add", verify, (req, res, next) => {
    dao.insert("actor", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

actorRouter.post("/actor/update", verify, (req, res, next) => {
    dao.update("actor", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

actorRouter.get("/actor/delete/:id", verify, (req, res, next) => {
    dao.remove("actor", req.params.id).then(data => res.json(data))
        .catch(err => next(err));
})

module.exports = actorRouter;