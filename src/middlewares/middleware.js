const { csrfSync } = require('csrf-sync');
const { generateToken } = csrfSync();

exports.checkRouteError = (err, req, res, next) => {
    if (err) {
        console.log(`Não achei a rota ${req.url}`)
        return res.render('404');
    }

    next();
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = generateToken(req);
    next();
}