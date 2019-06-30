const express = require("express");
const router = express.Router();
const Item = require("../../models/item");
const Listname = require("../../models/listname");

//show list of todo topics
router.get("/home/lemmein", (req, res) => {
  Listname.find({}).populate("items").exec((err, fListnames) => {
    if (err) console.log(err);
    else res.json(fListnames);
  });
});

//add new todo topic
router.post("/home/lemmein", (req, res) => {
  Listname.create({
    name: req.body.name,
    items: req.body.items
  });
});

//todos of 1 topic
router.get("/list/:id", (req, res) => {
  Listname.findById(req.params.id).populate("items").exec((err, fListname) => {
      if (err) {console.log(err);}
      else (res.json(fListname));
  });
});

//add new todo of 1 topic
router.post("/list/:id", (req, res) => {
  Listname.findById(req.params.id, (err, fListname) => {
    if (err) console.log(err);
    else {
      Item.create({
        task: req.body.task,
        done: false
      }, (err, crItem) => {
        if (err) {
          console.log(err);
        } else {
          fListname.items.push(crItem);
          fListname.save();
          res.end();
        }
      });
    }
  })
});

//update task
router.put("/list/:id", async (req, res) => {
  const fItem = await Item.findById(req.body.itemId);
  await Item.updateOne({_id: req.body.itemId}, {done: !fItem.done})
  .then(updateItem => res.json(updateItem))
  .catch(err => console.log(err));
})

//delete task
router.delete("/list/:id/:itemid", async (req, res) => {
  try {
    const curId = req.params.itemid;
    console.log("req.params: " + JSON.stringify(req.params));
    const dItem = await Item.deleteOne({_id:curId})
    await res.json(dItem);
    await console.log("Deleted: " + curId);
  } catch(err) {console.log(err)}
  
});

module.exports = router;