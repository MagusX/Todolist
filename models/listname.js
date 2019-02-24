const mongoose = require("mongoose");

let listSchema = new mongoose.Schema({
    name: String,
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }]
});

let List = mongoose.model("List", listSchema);
module.exports = List;