var mongoose = require("mongoose");

var vaultComics = new mongoose.Schema({
    publisher: String,
    description: String,
    title: String,
    price: String,
    creators: String,
    release_date: String,
    diamond_id: String,
    image: String,
});




module.exports = mongoose.model('vault', vaultComics);