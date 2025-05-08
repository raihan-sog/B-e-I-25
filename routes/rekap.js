const express = require("express");
const router = express.Router();
const db = require("../db");
const nodemailer = require("nodemailer");
const ExcelJS = require("exceljs");
const fs = require("fs");

// Kirim rekap manual ke email
router.post("/send-rekap", async (req, res) => {
  const sql = `SELECT * FROM visitors WHERE is_sent = FALSE`;
  db.query(sql, async (err, results) => {
    if (err) return res.status(500).json({ message: "Gagal ambil data" });

    if (results.length === 0) {
      return res.json({ message: "Tidak ada data baru untuk dikirim." });
    }

    // Buat file Excel
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Visitor Rekap");

    sheet.columns = [
      { header: "No", key: "no", width: 5 },
      { header: "Nama", key: "nama", width: 20 },
      { header: "Jabatan", key: "jabatan", width: 20 },
      { header: "Perusahaan", key: "perusahaan", width: 25 },
      { header: "Email", key: "email", width: 25 },
      { header: "Nomor HP", key: "nomor_hp", width: 15 },
      { header: "Waktu", key: "created_at", width: 20 }
    ];

    results.forEach((row, index) => {
      sheet.addRow({
        no: index + 1,
        ...row
      });
    });

    const filePath = "./rekap_visitor.xlsx";
    await workbook.xlsx.writeFile(filePath);

    // Kirim email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "indonesia.ptsog@gmail.com",
        pass: "nvyc aycd qzyh rsbu"
      }
    });

    const mailOptions = {
      from: "indonesia.ptsog@gmail.com",
      to: "sales@pt-sog.com",
      cc: "dedy@pt-sog.com, raihan@pt-sog.com, rizqi@pt-sog.com, fahzia@pt-sog.com, faisal@pt-sog.com",
      subject: `Rekap Visitor Indo Defence 2025 (Total: ${results.length})`,
      text: `Berikut ini adalah rekap pengunjung yang melakukan scan QR di booth SOG. Terlampir file Excel.\n\nTotal visitor: ${results.length}`,
      attachments: [
        {
          filename: "indo-defence2025.xlsx",
          path: filePath
        }
      ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Gagal kirim email" });
      }

      // Tandai sebagai terkirim
      const ids = results.map((r) => r.id);
      const updateSql = `UPDATE visitors SET is_sent = TRUE WHERE id IN (?)`;
      db.query(updateSql, [ids], (err2) => {
        if (err2) console.log("Gagal update is_sent:", err2);
      });

      fs.unlinkSync(filePath);

      res.json({ message: `Email rekap visitor (${results.length} data) berhasil dikirim.` });
    });
  });
});

module.exports = router;
