const express = require("express");
const { verify } = require("./middleware/auth");
const dao = require("../db/dao");
const { databaseURL } = require("../config");

const investmentRouter = express.Router();
dao.setURL(databaseURL);

investmentRouter.get("/investments", verify, (req, res, next) => {
    dao.all("investment").then(data => res.json(data))
        .catch(err => next(err));
});

investmentRouter.get("/investment/:id", verify, (req, res, next) => {
    dao.get("investment", req.params.id).then(data => res.json(data))
        .catch(err => next(err));
})

investmentRouter.post("/investment/add", verify, (req, res, next) => {
    dao.insert("investment", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

investmentRouter.post("/investment/update", verify, (req, res, next) => {
    dao.update("investment", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

investmentRouter.get("/investment/delete/:id", verify, (req, res, next) => {
    dao.remove("investment", req.params.id).then(data => res.json(data))
        .catch(err => next(err));
})

module.exports = investmentRouter;