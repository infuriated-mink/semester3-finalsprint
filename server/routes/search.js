const express = require("express");
const router = express.Router();
const { getFullTextPG } = require("../services/pg.fulltext.dal");
const { getFullTextM } = require("../services/m.fulltext.dal.js");

// Route to render search.ejs
router.get("/", async (req, res) => {
  try {
    // Pass an empty array as results for the initial GET request
    res.render("search", { type: "GAME" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to render custSearch.ejs
router.get("/customers", async (req, res) => {
  try {
    // Pass an empty array as results for the initial GET request
    res.render("search", { type: "CUSTOMER" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to handle game search request
// router.post("/results", async (req, res) => {
//   // search text must equal the value of the input field in search.ejs
//   const searchTextGame = req.body.searchTextGame;
//   const searchTextCustomer = req.body.searchTextCustomer;
//   if (req.url === "/search/results") {
//     try {
//       const results = await getFullTextPG(searchTextGame);
//       res.render("results", { results });
//     } catch (error) {
//       console.error("Error:", error);
//       res.status(500).send("Internal Server Error");
//     }
//   } else if (req.path === "http://localhost:3000/search/customers") {
//     try {
//       const results = await getFullTextM(searchTextCustomer);
//       res.render("custResults", { results });
//     } catch (error) {
//       console.error("Error:", error);
//       res.status(500).send("Internal Server Error");
//     }
//   }
// });

////////////////////////

// Route to handle both game and customer search requests
router.post("/results", async (req, res) => {
  const searchTextGame = req.body.searchTextGame;
  const searchTextCustomer = req.body.searchTextCustomer;

  let gameResults = [];
  let customerResults = [];

  gameResults = await getFullTextPG(searchTextGame);
  res.render("results", { gameResults });

  customerResults = await getFullTextM(searchTextCustomer);
  res.render("custResults", { customerResults });
});

////////////////////////

// Route to handle customer search request
// router.post("/customer/results", async (req, res) => {
//   const searchText = req.body.searchText;
//   try {
//     const results = await getFullTextM(searchText);
//     res.render("custResults", { results });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

module.exports = router;
