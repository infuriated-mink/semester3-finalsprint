const { MongoClient } = require('mongodb');
const atlas = "mongodb+srv://Vanessa:Keyin2021@semester3-sprint.taafami.mongodb.net/Semester3-Sprint";
const pool = new MongoClient(atlas);

module.exports = pool;