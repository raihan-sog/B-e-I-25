const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.MYSQLHOST || process.env.MYSQL_HOST,
  user: process.env.MYSQLUSER || process.env.MYSQL_USER,
  password: process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD,
  database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE,
  port: process.env.MYSQLPORT || process.env.MYSQL_PORT || 3306
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to MySQL:", err);
    throw err;
  }
  console.log("✅ MySQL connected!");
});

module.exports = db;