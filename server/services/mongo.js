const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Vanessa:Keyin2021@semester3-sprint.taafami.mongodb.net/Semester3-Sprint";
const pool = new MongoClient(uri);

module.exports = pool;