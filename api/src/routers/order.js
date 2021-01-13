const express = require("express");
const { verify } = require("./middleware/auth");
const dao = require("../db/dao");
const { databaseURL } = require("../config");

const orderRouter = express.Router();
dao.setURL(databaseURL);

orderRouter.get("/orders", verify, (req, res, next) => {
    dao.all("order").then(data => res.json(data))
        .catch(err => next(err));
});

orderRouter.get("/order/:id", verify, (req, res, next) => {
    dao.get("order", req.params.id).then(data => res.json(data))
        .catch(err => next(err));
})

orderRouter.post("/order/add", verify, (req, res, next) => {
    dao.insert("order", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

orderRouter.post("/order/update", verify, (req, res, next) => {
    dao.update("order", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

orderRouter.get("/order/delete/:id", verify, (req, res, next) => {
    dao.remove("order", req.params.id).then(data => res.json(data))
        .catch(err => next(err));
})

module.exports = orderRouter;