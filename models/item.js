const mongoose = require("mongoose");

let itemSchema = new mongoose.Schema({
    task: String,
    done: Boolean
});

let Item = mongoose.model("Item", itemSchema);
module.exports = Item;