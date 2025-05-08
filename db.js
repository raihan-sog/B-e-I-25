const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // ganti kalau kamu pakai user lain
  password: "",       // kosong kalau default XAMPP
  database: "sog_visitor"
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ MySQL connected!");
});

module.exports = db;
