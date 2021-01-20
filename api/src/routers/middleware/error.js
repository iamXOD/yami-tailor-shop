module.exports = errorHandler = function(error, req, res, next) {
    res.status(error.statusCode || 500).json({ error: error.toString() });
}