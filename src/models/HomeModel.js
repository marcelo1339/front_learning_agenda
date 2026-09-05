const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: String
});

// Nome do módulo + esquema
const HomeModel = mongoose.model('Home', HomeSchema);

module.exports = HomeModel;
