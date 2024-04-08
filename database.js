const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "marvel",
});

function connect() {
  return new Promise((resolve, reject) => {
    con.connect((error) => {
      if (error) {
        reject(error);
      } else {
        console.log("Connected!");
        resolve();
      }
    });
  });
}

function query() {
  console.log("query");
}

module.exports = {
  connect,
  con,
  query,
};
