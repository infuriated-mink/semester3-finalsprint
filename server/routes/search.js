const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch"); // Ensure you have 'node-fetch' installed for this to work

// Assuming getFullTextPG and getFullTextM are already defined and imported
const { getFullTextPG } = require("../services/pg.fulltext.dal");
const { getFullTextM } = require("../services/m.fulltext.dal.js");

// Function to log search queries
const logSearch = (username, searchTerm, timestamp) => {
  const logNote = `User: ${username} searched for ${searchTerm} at ${timestamp}\n`;
  const logPath = path.join(__dirname, "searchLog.txt");
  fs.appendFile(logPath, logNote, (error) => {
    if (error) {
      console.error(`Error writing to log file:`, error);
    } else {
      console.log("Log note written successfully");
    }
  });
};

// Route to fetch autocomplete suggestions
router.get("/suggest", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.json([]);
  }
  // Here you would typically fetch suggestions from your database or an external API
  // For demonstration, let's simulate fetching suggestions
  const suggestions = ["stardew valley", "star wars", "startup ideas"];
  const filteredSuggestions = suggestions.filter(suggestion => suggestion.toLowerCase().includes(query.toLowerCase()));
  res.json(filteredSuggestions);
});

// Route to render search.ejs
router.get("/", (req, res) => {
  res.render("search");
});

// Route to render custSearch.ejs
router.get("/customers", (req, res) => {
  res.render("custSearch");
});

// Route to handle game search request
router.post("/results", async (req, res) => {
  const searchText = req.body.searchText;
  try {
    const results = await getFullTextPG(searchText);
    const username = req.user ? req.user.email : 'Anonymous'; // Assuming email is the identifier
    const timestamp = new Date().toISOString();
    logSearch(username, searchText, timestamp);
    res.render("results", { results });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to handle customer search request
router.post("/customers/results", async (req, res) => {
  const searchText = req.body.searchText;
  try {
    const results = await getFullTextM(searchText);
    const username = req.user ? req.user.email : 'Anonymous'; // Assuming email is the identifier
    const timestamp = new Date().toISOString();
    logSearch(username, searchText, timestamp);
    res.render("custResults", { results });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;