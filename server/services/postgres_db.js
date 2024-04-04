const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "sprint-database.cfe8o668g7kv.us-east-2.rds.amazonaws.com",
  database: "postgres",
  password: "Keyin2021",
  port: 5432,
  ssl: { rejectUnauthorized: false }, // !! this is obviously not secure in a production environment but we decided it was okay for this project !!
});
module.exports = pool;
