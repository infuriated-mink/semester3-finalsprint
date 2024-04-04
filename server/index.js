const express = require("express");
const methodOverride = require("method-override");
const app = express();
const PORT = 3000;

// Set up the app
global.DEBUG = true;
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"))

// Routes
// "/"
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// "/search"
const searchRouter = require("./routes/search");
app.use("/search", searchRouter);

// "search/customers"
const customersRouter = require("./routes/search");
app.use("/search/customers", customersRouter);

// "error 404"
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`);
});
