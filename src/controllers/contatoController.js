const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    res.render('../views/contato', {contato: {}});
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
            res.redirect(`/contato/index/${contato.contato._id}`);
        });

    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.editIndex = async function (req, res) {
    if (!req.params.id) return res.render('404'); 

    const contato = await Contato.buscaPorId(req.params.id);
    
    if (!contato) {
        res.render('404');
    }
    
    res.render('contato', {
        contato: contato
    });

}

exports.editContact = async function (req, res) {
    if (!req.params.id) return res.render('404'); 
    try {

        const contato = new Contato(req.body);
        await contato.edit(req.params.id);
    
        if (contato.contactFormHasErrors()) {
            req.flash('errors', contato.errors);
            req.session.save(function () {
                res.redirect('/contato/index');
            });
            return;
        }
    
        req.flash('success', 'Contato atualizado!');
        req.session.save(function () {
            res.redirect(`/contato/index/${contato.contato._id}`);
        });

    } catch (e) {
        console.log(e);
        return res.render('404');
    }

}