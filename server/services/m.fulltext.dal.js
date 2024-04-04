const { ObjectId } = require("mongodb");
const dal = require("./mdb");

async function getFullTextM(fulltext) {
  if (DEBUG) console.log("m.dal.getFullTextM()");
  try {
    await dal.connect();
    const database = dal.db("Final_Sprint");
    const collection = database.collection("CustomerJSON");
    const result = await collection
      .find({ $text: { $search: fulltext } })
      .toArray();
    return result;
  } catch (err) {
    console.error("Error occurred while connecting to MongoDB:", err);
    throw err;
  } finally {
    dal.close();
  }
}

module.exports = {
  getFullTextM,
};
