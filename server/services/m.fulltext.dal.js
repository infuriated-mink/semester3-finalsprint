const { ObjectId } = require("mongodb");
const dal = require("./mdb");

// Get full text search results
async function getFullTextM(fulltext) {
  if (DEBUG) console.log("m.dal.getFullTextM()");
  try {
    await dal.connect();
    const database = dal.db("Semester3-Sprint");
    const collection = database.collection("Customers");
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
