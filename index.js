const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import router
const visitorRouter = require("./routes/visitor.js");
const rekapRouter = require("./routes/rekap.js");

const app = express();
const PORT = 5555;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint tes
app.get("/", (req, res) => {
  res.send("API SOG Visitor Indo-Defence 2025 aktif!");
});

// Gunakan router
app.use("/api", visitorRouter);
app.use("/api", rekapRouter);

// Mulai server di semua IP (0.0.0.0)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});