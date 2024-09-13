const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

const dbURI =
   "mongodb+srv://igiranezaj28:Cmnder%2F09@nodejstut.djz3xrv.mongodb.net/nodejs-tut?retryWrites=true&w=majority";

const itemSchema = new mongoose.Schema({
   name: String,
   description: String,
   price: Number,
});

const Item = mongoose.model("Item", itemSchema);

app.listen(3000, "localhost", () => {
   console.log(" Server Started ============================================");
});
