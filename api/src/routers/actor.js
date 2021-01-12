const express = require("express");
const auth = require("./auth");
const dao = require("../db/dao");
const { databaseURL } = require("../config");

const actorRouter = express.Router();
dao.setURL(databaseURL);

actorRouter.get("/actors", auth, (req, res) => {
    dao.all("actor").then(data => res.json(data))
        .catch(err => res.status(404).send(err));
})

actorRouter.get("/actor/:id", auth, (req, res) => {
    dao.get("actor", req.params.id).then(data => res.json(data))
        .catch(err => res.status(404).send(err));
})

actorRouter.post("/actor/add", auth, (req, res) => {
    if (req.user) {
        dao.insert("actor", req.body).then(data => res.json(data))
            .catch(err => res.status(404).send(err));
    } else {
        res.status(403).send("You must authenticate first");
    }
})

actorRouter.post("/actor/update", auth, (req, res) => {
    if (req.user) {
        dao.update("actor", req.body).then(data => res.json(data))
            .catch(err => res.status(404).send(err));
    } else {
        res.status(403).send("You must authenticate first");
    }
})

actorRouter.get("/actor/delete/:id", auth, (req, res) => {
    if (req.user) {
        dao.remove("actor", req.params.id).then(data => res.json(data))
            .catch(err => res.status(404).send(err));
    } else {
        res.status(403).send("You must authenticate first");
    }
})

module.exports = actorRouter;