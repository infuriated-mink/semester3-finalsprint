const express = require("express");
const methodOverride = require("method-override");
const app = express();
const PORT = 3000;

global.DEBUG = true;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); // This is important!
app.use(methodOverride("_method")); // So is this!

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// anything beginning with "/search" will go into this
const searchRouter = require("./routes/search");
app.use("/search", searchRouter);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`);
});
