const express = require("express");
const { verify } = require("./middleware/auth");
const dao = require("../db/dao");
const { databaseURL } = require("../config");

const fixRouter = express.Router();
dao.setURL(databaseURL);

fixRouter.get("/fixes", verify, (req, res, next) => {
    dao.all("fix").then(data => res.json(data))
        .catch(err => next(err));
});

fixRouter.get("/fix/:id", verify, (req, res, next) => {
    dao.get("fix", req.params.id).then(data => res.json(data))
        .catch(err => next(err));
})

fixRouter.post("/fix/add", verify, (req, res, next) => {
    dao.insert("fix", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

fixRouter.post("/fix/update", verify, (req, res, next) => {
    dao.update("fix", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

fixRouter.get("/fix/delete/:id", verify, (req, res, next) => {
    dao.remove("fix", req.params.id).then(data => res.json(data))
        .catch(err => next(err));
})

module.exports = fixRouter;