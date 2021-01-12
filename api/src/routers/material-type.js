const express = require("express");
const auth = require("./auth");
const dao = require("../db/dao");
const { databaseURL } = require("../config");

const materialTypeRouter = express.Router();
dao.setURL(databaseURL);

materialTypeRouter.get("/material_types", auth, (req, res) => {
    dao.all("material_type").then(data => res.json(data))
        .catch(err => res.status(403).send(err));
})
materialTypeRouter.get("/material_type/:id", auth, (req, res) => {
    dao.get("material_type", req.params.id).then(data => res.json(data))
        .catch(err => res.status(403).send(err));
})
materialTypeRouter.post("/material_type/add", auth, (req, res) => {
    if (req.user) {
        dao.insert("material_type", req.body).then(data => res.json(data))
            .catch(err => res.status(403).send(err));
    } else {
        res.status(403).send("You must authenticate first");
    }
})
materialTypeRouter.post("/material_type/update", auth, (req, res) => {
    if (req.user) {
        dao.update("material_type", req.body).then(data => res.json(data))
            .catch(err => res.status(403).send(err));
    } else {
        res.status(403).send("You must authenticate first");
    }
})
materialTypeRouter.get("/material_type/delete/:id", auth, (req, res) => {
    if (req.user) {
        dao.remove("material_type", req.params.id).then(data => res.json(data))
            .catch(err => res.status(403).send(err));
    } else {
        res.status(403).send("You must authenticate first");
    }
})

module.exports = materialTypeRouter;