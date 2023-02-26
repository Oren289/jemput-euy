const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const pool = require("../db");

router.post("/", [body("nomor_kontak").isMobilePhone().withMessage("No handphone tidak valid")], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.errors.length !== 0) {
      console.log(errors);
      res.status(401).json(errors);
      return;
    }

    const { nama_pelapor, nomor_kontak, deskripsi, foto_aduan, jenis_aduan } = req.body;

    const newLaporan = await pool.query("INSERT INTO data_aduan (nama_pelapor, nomor_kontak, deskripsi, foto_aduan, jenis_aduan) VALUES ($1, $2, $3, $4, $5)", [nama_pelapor, nomor_kontak, deskripsi, foto_aduan, jenis_aduan]);

    res.status(201).json({ status: "ok" });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
