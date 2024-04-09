const { MongoClient } = require("mongodb");

// const uri = process.env.MONGO_URI;
const atlas = "mongodb+srv://Vanessa:Keyin2021@semester3-sprint.taafami.mongodb.net/";

// const pool = new MongoClient(uri);
const pool = new MongoClient(atlas);

module.exports = pool;
