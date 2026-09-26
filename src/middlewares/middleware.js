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

exports.userActiveMiddleWare = (req, res, next) => {
    res.locals.user = req.session.user;
    next();
}

exports.loginRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash('errors', 'Você precisa fazer login.');
        req.session.save(
            function () {
                res.redirect('/');
            }
        )
        return;
    }

    next();
}