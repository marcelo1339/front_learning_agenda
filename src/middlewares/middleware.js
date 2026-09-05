const { csrfSync } = require('csrf-sync');
const { generateToken } = csrfSync();

exports.checkCsrfError = (err, req, res, next) => {
    if (err && err.code === 'EBADCSRFTOKEN') {
        return res.render('404');
    }
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = generateToken(req);
    next();
}