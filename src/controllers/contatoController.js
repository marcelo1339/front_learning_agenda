const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    res.render('../views/contato');
    return;
};

exports.register = async (req, res) => {
    try {        
        const contato = new Contato(req.body);
        
        await contato.register();
    
        if (contato.contactFormHasErrors()) {
            req.flash('errors', contato.errors);
            req.session.save(function () {
                res.redirect('/contato/index');
            });
            return;
        }

        req.flash('success', 'Contato cadastrado!');
        req.session.save(function () {
            res.redirect('/contato/index');
        });

    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};