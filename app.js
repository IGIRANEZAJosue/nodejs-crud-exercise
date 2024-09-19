const express = require("express");
const mongoose = require("mongoose");
const app = express();

const dbURI =
   "mongodb+srv://igiranezaj28:Cmnder%2F09@nodejstut.djz3xrv.mongodb.net/crudApp?retryWrites=true&w=majority";

mongoose
   .connect(dbURI)
   .then(() => console.log("Connected to DB"))
   .catch((err) => console.log(err.message));

const itemSchema = new mongoose.Schema(
   {
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
   },
   { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

app.use(express.json());

app.get("/items", (req, res) => {
   Item.find()
      .sort({ createdAt: -1 })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
         console.log(err);
         res.status(500).send("Internal server error");
      });
});

app.post("/items", async (req, res) => {
   try {
      const newItem = new Item(req.body);
      const addedItem = await newItem.save();
      res.status(200).json(addedItem);
   } catch (err) {
      res.status(500).json({ err: "internal server error" });
   }
});

app.get("/items/:id", async (req, res) => {
   try {
      const item = await Item.findById(req.params.id);
      if (!item) res.status(404).json({ error: "Item not found" });
      res.status(200).json(item);
   } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
   }
});

app.put("/items/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const updatedItem = await Item.findByIdAndUpdate(id, req.body);
      if (!updatedItem) res.status(404).send("Item not found");
      res.status(200).json(updatedItem);
   } catch (err) {
      res.status(500).josn({ error: "Internal server error" });
   }
});

app.delete("/items/:id", async (req, res) => {
   try {
      const deletedItem = await Item.findByIdAndDelete(req.params.id);
      if (!deletedItem) res.status(404).send("Item to be deleted not found");
      res.status(200).send(deletedItem);
   } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error");
   }
});

app.listen(3000, "localhost", () => {
   console.log(" Server Started ============================================");
});
