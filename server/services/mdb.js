const { MongoClient } = require("mongodb");

// const uri = "mongodb://127.0.0.1:27017/";
const atlas =
  "mongodb+srv://evanharte:Kh8E5b8PIvm4AVh6@cluster0.jkzu0ey.mongodb.net/";

// const pool = new MongoClient(uri);
const pool = new MongoClient(atlas);

module.exports = pool;
