const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.post("/", authorization, async (req, res) => {
  try {
    const { nama, noHp, kecamatan, kelurahan, keteranganAlamat, jumlahSampah, jenisSampah, keteranganTambahan } = req.body;

    const newPermintaanLayanan = await pool.query(
      "INSERT INTO permintaan_layanan (username_pengguna, nama_pemohon, no_hp_pemohon, alamat_kecamatan, alamat_kelurahan, alamat_ket_tambahan, jumlah_sampah, keterangan_tambahan) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_permintaan",
      [req.user, nama, noHp, kecamatan, kelurahan, keteranganAlamat, jumlahSampah, keteranganTambahan]
    );

    const id_permintaan = newPermintaanLayanan.rows[0].id_permintaan;

    jenisSampah.forEach(async (element) => {
      const newJenisSampah = await pool.query("INSERT INTO jenis_sampah (id_permintaan, sampah) VALUES ($1, $2)", [id_permintaan, element.value]);
    });

    res.status(201).json({ status: "ok", msg: "Created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
