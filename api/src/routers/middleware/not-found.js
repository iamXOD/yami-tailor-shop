const express = require("express");

const notFoundRouter = express.Router();

notFoundRouter.all("*", (req, res, next) => {
    next(new Error("Resource not found"));
})

module.exports = notFoundRouter;