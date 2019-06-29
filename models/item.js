const mongoose = require("mongoose");

let itemSchema = new mongoose.Schema({
    task: String,
    done: Boolean
});

module.exports = Item = mongoose.model("Item", itemSchema);