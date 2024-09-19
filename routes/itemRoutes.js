const express = require("express");
const router = express.Router();
const Item = require("../models/item");
const {
   getItems,
   getSingleItem,
   updateItem,
   deleteItem,
   postItem,
} = require("../controllers/itemControllers");

router.get("/items", getItems);

router.post("/items", postItem);

router.get("/items/:id", getSingleItem);

router.put("/items/:id", updateItem);

router.delete("/items/:id", deleteItem);

module.exports = router;
