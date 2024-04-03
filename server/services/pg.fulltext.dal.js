const dal = require("./postgres_db");

var getFullTextPG = function (text) {
  if (DEBUG) console.log("pg.dal.getFullTextPG()");
  return new Promise(function (resolve, reject) {
    const sql = `SELECT gametitle, description, price, instorelocation FROM "Games"
        WHERE description iLIKE '%'||$1||'%'
        OR gametitle iLIKE '%'||$1||'%'`;
    dal.query(sql, [text], (err, result) => {
      if (err) {
        // logging should go here
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        if (DEBUG) console.log(`Row count: ${result.rowCount}`);
        resolve(result.rows);
      }
    });
  });
};

module.exports = {
  getFullTextPG,
};
