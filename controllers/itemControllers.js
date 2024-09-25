const Item = require("../models/item");

const getItems = async (req, res) => {
   try {
      const items = await Item.find().sort({ createdAt: -1 });
      if (items.length === 0) res.status(404).send("Items not found ");
      res.status(200).json(items);
   } catch (error) {
      res.status(500).send("Internal server error");
   }
};

const postItem = async (req, res) => {
   try {
      const newItem = new Item(req.body);
      const addedItem = await newItem.save();
      res.status(200).json(addedItem);
   } catch (err) {
      res.status(500).json({ err: "internal server error" });
   }
};

const getSingleItem = async (req, res) => {
   try {
      const item = await Item.findById(req.params.id);
      if (!item) res.status(404).json({ error: "Item not found" });
      res.status(200).json(item);
   } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
   }
};

const updateItem = async (req, res) => {
   try {
      const id = req.params.id;
      const updatedItem = await Item.findByIdAndUpdate(id, req.body);
      if (!updatedItem) res.status(404).send("Item not found");
      res.status(200).json(updatedItem);
   } catch (err) {
      res.status(500).josn({ error: "Internal server error" });
   }
};

const deleteItem = async (req, res) => {
   try {
      const deletedItem = await Item.findByIdAndDelete(req.params.id);
      if (!deletedItem) res.status(404).send("Item to be deleted not found");
      res.status(200).send(deletedItem);
   } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error");
   }
};

module.exports = {
   getItems,
   postItem,
   getSingleItem,
   updateItem,
   deleteItem,
};
