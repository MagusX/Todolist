const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const bodyParser = require("body-parser");
const Listname = require("./models/listname");
const Item = require("./models/item");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/todolist", {useNewUrlParser: true});
app.use(methodOverride("_method"));
let port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.render("login.ejs");
});

app.post("/", (req, res) => {
    res.redirect(`/home/${req.body.password}`);
});

app.get("/home/:pass", (req, res) => {
    if (req.params.pass == "lemmein") {
        Listname.find({}).populate("items").exec((err, fListnames) => {
            if (err) {console.log(err);}
            else {
                res.render("home.ejs", {fListnames: fListnames});
            }
        });
    } else {
        res.redirect("back");
    }
});

app.post("/home", (req, res) => {
    Listname.create({name: req.body.name});
    res.redirect("/home");
});

app.get("/list/:id", (req, res) => {
    Listname.findById(req.params.id).populate("items").exec((err, fListname) => {
        if (err) {console.log(err);}
        else {
            res.render("list.ejs", {fList: fListname});
        }
    });
});

app.post("/list/:id", (req, res) => {
    Listname.findById(req.params.id, (err, fListname) => {
        if (err) {console.log(err);}
        else {
            Item.create({
                task: req.body.task,
                done: false
            }, (err, crItem) => {
                if (err) {
                    console.log(err);
                    res.redirect("back");  
                } else {
                    fListname.items.push(crItem);
                    fListname.save();
                    res.redirect(`/list/${req.params.id}`);
                }
            });
        }
    })
});

app.put("/list/:id", (req, res) => {
    Listname.findById(req.params.id).populate("items")
    .exec((err, fListname) => {
        if (err) {console.log(err);}
        else {
            fListname.items.forEach(item => {
                if (item._id == req.body.itemId) {
                    let change = item.done ? false : true;
                    item.done = change;
                    Item.findByIdAndUpdate(item._id, { $set: {done: change}}, (err, fItem) => {
                        if (err) {console.log(err);}
                        else {
                            fItem.save();
                            fListname.save();
                        }
                    });
                    return res.redirect(`/list/${req.params.id}`);
                }
            });
        }
    });
});

app.delete("/list/:id", (req, res) => {
    Listname.findById(req.params.id).populate("items")
    .exec((err, fListname) => {
        if (err) {console.log(err);}
        else {
            for (let i = 0; i < fListname.items.length; i++) {
                if (fListname.items[i]._id == req.body.itemId) {
                    fListname.items.splice(i, 1);
                    fListname.save();
                }
            }  
            Item.findByIdAndRemove(req.body.itemId, (err) => {
                if (err) {console.log(err);}
                else {
                    return res.redirect(`/list/${req.params.id}`);
                }
            });
        }
    });
});

app.listen(port, () => {console.log("Server started on port " + port);});