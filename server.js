/*
Add code for production, create build forlder
*/

const express = require("express");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const bodyParser = require("body-parser");
const items = require("./routes/api/itemRoutes");
const login = require('./routes/auth/login');
const path = require("path");
const initDB = require('./initDB');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
mongoose.connect("mongodb://localhost/todolist", {useNewUrlParser: true})
// mongoose.connect("mongodb+srv://Tarrasque18:todolistproj@todolist-8wbrw.mongodb.net/todolist?retryWrites=true", {useNewUrlParser: true})
.then(console.log("Connected to MongoDB"))
.catch(err => console.log(err));

mongoose.connection.on('open', (ref) => {
  mongoose.connection.db.listCollections({name: 'passes'})
  .next((err, col) => {
    if (!col) initDB.initPass();
  });
});

let port = process.env.PORT || 4000;
app.use("/", items, login);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/client/build"));
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.listen(port, () => {console.log("Server started on port " + port);});
