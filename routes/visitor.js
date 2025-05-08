const express = require("express");
const router = express.Router();
const db = require("../db");

// --- Ini endpoint buat terima data visitor dari form ---
router.post("/submit", (req, res) => {
  const { nama, jabatan, perusahaan, email, nomor_hp } = req.body;

  const sql = `INSERT INTO visitors (nama, jabatan, perusahaan, email, nomor_hp) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [nama, jabatan, perusahaan, email, nomor_hp], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal simpan data" });
    }
    res.json({ message: "Berhasil disimpan" });
  });
});

// --- Ini endpoint buat tampilkan semua visitors untuk dashboard admin ---
router.get("/visitors", (req, res) => {
  db.query("SELECT * FROM visitors ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ message: "Gagal ambil data" });
    res.json(results);
  });
});

module.exports = router;
