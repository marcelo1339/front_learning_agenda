exports.paginaInicial = (requisicao, resposta) => {
    
    resposta.render('index', {
        numeros: [10, 20, 30, 40, 50, 60, 70, 80, 90],
        umaVariavelLocal: resposta.locals.umaVariavelLocal
    });
    return
};

exports.trataPost = (req, res) => {
    req.body.nome = "Marcelo";
    res.send(req.body);
    return
};