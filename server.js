const express = require("express");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const bodyParser = require("body-parser");
const items = require("./routes/api/itemRoutes");
const path = require("path");

const app = express();
app.use(bodyParser.json());
//mongoose.connect("mongodb://localhost/todolist", {useNewUrlParser: true})
mongoose.connect("mongodb+srv://Tarrasque18:todolistproj@todolist-8wbrw.mongodb.net/todolist?retryWrites=true", {useNewUrlParser: true})
.then(console.log("Connected to MongoDB"))
.catch(err => console.log(err));

let port = process.env.PORT || 4000;
app.use("/", items);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/client/build"));
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.listen(port, () => {console.log("Server started on port " + port);});
