const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

const dbURI =
   "mongodb+srv://igiranezaj28:Cmnder%2F09@nodejstut.djz3xrv.mongodb.net/crudApp?retryWrites=true&w=majority";

mongoose
   .connect(dbURI)
   .then(() => console.log("Connected to DB"))
   .catch((err) => console.log(err.message));

const itemSchema = new mongoose.Schema(
   {
      name: String,
      description: String,
      price: Number,
   },
   { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

app.get("/items", (req, res) => {
   Item.find()
      .sort({ createdAt: -1 })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
         console.log(err);
         res.status(500).send("Internal server error");
      });   
});

app.get("/items/:id", (req, res) => {
   Item.findById(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).send("Internal server error"));
});

app.listen(3000, "localhost", () => {
   console.log(" Server Started ============================================");
});
