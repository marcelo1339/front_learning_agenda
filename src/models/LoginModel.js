const mongoose = require('mongoose');
const validator = require('validator');
const bcriptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    senha: { type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);


class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register() {
        this.valida();
        if (this.loginFormHasErrors()) return;
        
        await this.userExists();

        // Checando novamente por conta de possíveis erros no cadastro
        if (this.loginFormHasErrors()) return;

        const salt = bcriptjs.genSaltSync();
        this.body.senha = bcriptjs.hashSync(this.body.senha, salt);    


        try {
            this.user = await LoginModel.create(this.body);
        }
        catch (e) {
            console.log(`Erro ao criar usuário -> ${e}`);
        }
    }

    async userExists() {
        const findUser = await LoginModel.findOne({
            email: this.body.email,
        })

        if (findUser) {
            this.errors.push('E-mail já cadastrado na base.');
        };
    }

    loginFormHasErrors() {
        return this.errors.length > 0;
    }

    valida() {
        this.cleanUp();

        if (!(validator.isEmail(this.body.email))) {
            this.errors.push('E-mail inválido.');
        }

        if (this.body.senha.length < 3 || this.body.senha.length >= 50) {
            this.errors.push('Senha deve ter entre 3 e 50 caracteres.');
        }

    }

    cleanUp(){
        for (let key in this.body) {

            if (typeof (this.body[key]) !== 'string') {
                this.body[key] = '';
            };
        }

        // Caso outras coisas venham no body, eu só pego os necessários
        this.body = {
            email: this.body.email,
            senha: this.body.senha
        }
    }
};


module.exports = Login;
