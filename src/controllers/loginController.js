exports.index = (req, res) => {
    res.render('login');
    return;
}

exports.register = (req, res) => {
    res.send('TESTETESTE');
    console.log("ESTOU NO REGISTER");
    return;
}