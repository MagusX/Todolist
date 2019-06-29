const mongoose = require("mongoose");

let listSchema = new mongoose.Schema({
    name: String,
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }]
});

module.exports = List = mongoose.model("List", listSchema);