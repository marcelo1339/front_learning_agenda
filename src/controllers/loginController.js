const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    res.render('login');
    return;
}

exports.register = async (req, res) => {
    const login = new Login(req.body);
    
    try {
        await login.register();
    } catch (e) {
        console.log(e);
        res.render('404');
        return;
    }

    if (login.loginFormHasErrors()) {

        // Salvando temporariamente os erros na sessão
        req.flash('errors', login.errors);
        
        // Redirecionando o usuário após salvar a sessão
        req.session.save(function () {
            res.redirect('/login/index');
        });
        return;
    }
    
    req.flash('success', 'Usuário cadastrado com sucesso!')
    req.session.save(function () {
        res.redirect('/login/index');
    });
}

exports.login = async (req, res) => {
    const login = new Login(req.body);
    await login.login();

    if (login.loginFormHasErrors()) {
        req.flash('errors', login.errors);
        req.session.save(function () {
            return res.redirect('/login/index');
        });
        
        return;
    }
    
    req.session.user = login.user;
    req.flash('success', 'Você entrou no sistema.');

    req.session.save(function () {
        return res.redirect('/');
    });

}

exports.logout = function (req, res) {
    req.session.destroy();
    res.redirect('/');
}