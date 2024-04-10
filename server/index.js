if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const fs = require("fs");
const initializePassport = require("./passport-config");
initializePassport(passport, getUserByEmail, getUserById);

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

let users = [];
fs.readFile("./models/users.json", (err, data) => {
  if (err) throw err;
  users = JSON.parse(data);
});

function getUserByEmail(email) {
  return users.find((user) => user.email === email);
}

function getUserById(id) {
  return users.find((user) => user.id === id);
}

initializePassport(passport, getUserByEmail, getUserById);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = getUserById(id);
  done(null, user);
});

// Middleware to check if the user is authenticated
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// Middleware to check if the user is not authenticated
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

app.get("/", checkAuthenticated, (req, res) => {
  res.render("index.ejs", { name: req.user.name });
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});

app.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };
    users.push(newUser);
    saveUsers();
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
});

app.delete("/logout", (req, res) => {
  req.logOut(() => {
    res.redirect("/login");
  });
});

// Function to save users to the JSON file
function saveUsers() {
  fs.writeFile("./models/users.json", JSON.stringify(users, null, 2), (err) => {
    if (err) throw err;
  });
}

// "/search" route setup
const searchRouter = require("./routes/search");
app.use("/search", checkAuthenticated, searchRouter);

// Handling 404
app.use((req, res) => {
  res.status(404).render("404");
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
