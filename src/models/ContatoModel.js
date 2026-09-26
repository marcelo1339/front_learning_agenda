const mongoose = require("mongoose");
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.prototype.register = async function () {
    this.valida();

    if (this.contactFormHasErrors()) return;

    this.contato = await ContatoModel.create(this.body);
}

Contato.prototype.userExists = async function () {
    const findUser = await ContatoModel.findOne({
        $or: [
            { email: this.body.email },
            { telefone: this.body.telefone }
        ]
    });

    if (findUser) {
        this.errors.push('E-mail e/ou telefone já cadastrado(s) na base.');
    };

    return findUser;
}
    
Contato.prototype.contactFormHasErrors = function () {
    return this.errors.length > 0;
}

Contato.prototype.valida = function () {
    this.cleanUp();

    if (this.body.email && !(validator.isEmail(this.body.email))) {
        this.errors.push('E-mail inválido.');
    }

    if (!this.body.nome) {
        this.errors.push('Nome é obrigatório.');
    }
    
    if (!this.body.email && !this.body.telefone) {
        this.errors.push('É necessário informar uma forma de contato.');
    }
}
    
Contato.prototype.cleanUp = function (){
    for (let key in this.body) {

        if (typeof (this.body[key]) !== 'string') {
            this.body[key] = '';
        };
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone
    }
}

module.exports = Contato;