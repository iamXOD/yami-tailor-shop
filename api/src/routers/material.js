const express = require("express");
const { verify } = require("./middleware/auth");
const dao = require("../db/dao");
const { databaseURL } = require("../config");

const materialRouter = express.Router();
dao.setURL(databaseURL);

materialRouter.get("/materials", verify, (req, res, next) => {
    dao.all("material").then(data => res.json(data))
        .catch(err => next(err));
});

materialRouter.get("/material/:id", verify, (req, res, next) => {
    dao.get("material", req.params.id).then(data => res.json(data))
        .catch(err => next(err));
})

materialRouter.post("/material/add", verify, (req, res, next) => {
    dao.insert("material", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

materialRouter.post("/material/update", verify, (req, res, next) => {
    dao.update("material", req.body).then(data => res.json(data))
        .catch(err => next(err));
})

materialRouter.get("/material/delete/:id", verify, (req, res, next) => {
    dao.remove("material", req.params.id).then(data => res.json(data))
        .catch(err => next(err));
})

module.exports = materialRouter;