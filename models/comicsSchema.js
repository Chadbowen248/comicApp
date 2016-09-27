var mongoose = require("mongoose");

var comicSchema = new mongoose.Schema({
    publisher: String,
    description: String,
    title: String,
    price: String,
    creators: String,
    release_date: String,
    diamond_id: String,
});




module.exports = mongoose.model('dbComic', comicSchema);