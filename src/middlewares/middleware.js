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

exports.globalMessages = (req, res, next) => {
    // Capturando erros e mensagens salvos na sessão
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    next();
}