const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: 'postgres',
  host: 'sprint-database.cfe8o668g7kv.us-east-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'Keyin2021',
  port: 5432,
  ssl: { rejectUnauthorized: false }, 
  // !! this is obviously not secure in a production environment and will make us vulnerable to 
  // man-in-the-middle attacks but we decided it was okay for this project in order to access RDS server!!
});
module.exports = pool;
