const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }, 
  // !! this is obviously not secure in a production environment and will make us vulnerable to 
  // man-in-the-middle attacks but we decided it was okay for this project in order to access RDS server!!
});
module.exports = pool;
