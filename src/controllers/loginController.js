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