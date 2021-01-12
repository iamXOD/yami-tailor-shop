const express = require("express");
const { verify } = require("./middleware/auth");
const dao = require("../db/dao");
const { databaseURL } = require("../config");

const materialTypeRouter = express.Router();
dao.setURL(databaseURL);

materialTypeRouter.get("/material_types", verify, (req, res) => {
    dao.all("material_type").then(data => res.json(data))
        .catch(err => next(err));
})
materialTypeRouter.get("/material_type/:id", verify, (req, res) => {
    dao.get("material_type", req.params.id).then(data => res.json(data))
        .catch(err => next(err));
})
materialTypeRouter.post("/material_type/add", verify, (req, res) => {
    dao.insert("material_type", req.body).then(data => res.json(data))
        .catch(err => next(err));
})
materialTypeRouter.post("/material_type/update", verify, (req, res) => {
    dao.update("material_type", req.body).then(data => res.json(data))
        .catch(err => next(err));

})
materialTypeRouter.get("/material_type/delete/:id", verify, (req, res) => {
    dao.remove("material_type", req.params.id).then(data => res.json(data))
        .catch(err => next(err));
})

module.exports = materialTypeRouter;