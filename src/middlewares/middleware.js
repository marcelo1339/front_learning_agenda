const { generateToken } = require('./csrfMiddleware');

exports.checkRouteError = (err, req, res, next) => {
    if (err) {
        console.log(`erro -> ${err.code}\nMessage -> "${err.message}"`);
        return res.render('404');
    }

    next();
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = generateToken(req);
    next();
}