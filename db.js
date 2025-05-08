const mysql = require("mysql2");

const db = mysql.createConnection(process.env.MYSQL_URL || {
  host: process.env.MYSQLHOST || process.env.DB_HOST,
  user: process.env.MYSQLUSER || process.env.DB_USER,
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
  database: process.env.MYSQLDATABASE || process.env.DB_NAME,
  port: process.env.MYSQLPORT || process.env.DB_PORT || 3306
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to MySQL:", err);
    throw err;
  }
  console.log("✅ MySQL connected!");
});

module.exports = db;