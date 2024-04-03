const { ObjectId } = require("mongodb");
const dal = require("../../../services/mongo");
const DEBUG = true;

// get all customers from the database
async function getCustomers() {
  if (DEBUG) console.log("customers.mongo.dal.getCustomers()");
  try {
    await dal.connect();
    const cursor = dal.db("Auth").collection("customer").find();
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.log(error);
  } finally {
    dal.close();
  }
}

async function getCustomerByCustomerId(id) {
  if (DEBUG) console.log("customers.mongo.dal.getCustomerByCustomerId()");
  try {
    await dal.connect();
    const database = dal.db("Auth");
    const collection = database.collection("customer");
    const result = await collection.findOne({ _id: new ObjectId(id) });
    if (DEBUG) console.log(result);
    return result;
  } catch (error) {
    console.error('Error occurred while connecting to MongoDB:', error);
    throw error;
  } finally {
    dal.close();
  }
}

// search for a customer by first name, last name, email, or phone number
async function searchCustomers(searchQuery) {
    if (DEBUG) console.log("customers.mongo.dal.searchCustomers() with query:", searchQuery);
    try {
      await dal.connect();
      const query = {
        $or: [
          { firstName: { $regex: searchQuery, $options: 'i' } },
          { lastName: { $regex: searchQuery, $options: 'i' } },
          { email: { $regex: searchQuery, $options: 'i' } },
          { phoneNumber: { $regex: searchQuery, $options: 'i' } }
        ]
      };
      const cursor = dal.db("Auth").collection("customer").find(query);
      const results = await cursor.toArray();
      if (DEBUG) console.log("Search results:", results);
      return results;
    } catch (error) {
      console.error('Error occurred while searching customers:', error);
      throw error;
    } finally {
      dal.close();
    }
  }

  
  
module.exports = {
  getCustomers,
  getCustomerByCustomerId,
  searchCustomers
};