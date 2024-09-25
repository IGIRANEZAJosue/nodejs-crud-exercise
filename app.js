const express = require("express");
const mongoose = require("mongoose");
const app = express();
const itemRoutes = require("./routes/itemRoutes");

const dbURI =
   "mongodb+srv://igiranezaj28:Cmnder%2F09@nodejstut.djz3xrv.mongodb.net/crudApp?retryWrites=true&w=majority";

mongoose
   .connect(dbURI)
   .then(() => console.log("Connected to DB"))
   .catch((err) => console.log(err.message));

app.use(express.json());

app.use(itemRoutes);

app.listen(3000, "localhost", () => {
   console.log(" Server Started ============================================");
});
