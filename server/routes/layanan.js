const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const pool = require("../db");
const adminAuthorization = require("../middleware/adminAuthorization");
const authorization = require("../middleware/authorization");

router.post("/", authorization, async (req, res) => {
  try {
    const { nama, noHp, valueKecamatan, kelurahan, keteranganAlamat, jumlahSampah, jenisSampah, keteranganTambahan } = req.body;

    const newPermintaanLayanan = await pool.query(
      "INSERT INTO permintaan_layanan (username_pengguna, nama_pemohon, no_hp_pemohon, alamat_kecamatan, alamat_kelurahan, alamat_ket_tambahan, jumlah_sampah, keterangan_tambahan) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_permintaan",
      [req.user, nama, noHp, valueKecamatan, kelurahan, keteranganAlamat, jumlahSampah, keteranganTambahan]
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

router.get("/", authorization, async (req, res) => {
  try {
    const semuaLayanan = await pool.query("SELECT * FROM permintaan_layanan ORDER BY urutan ASC");

    res.status(200).json({
      status: "ok",
      data: semuaLayanan.rows,
    });
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/:id", authorization, async (req, res) => {
  try {
    // console.log(req.params.id);
    const detailLayanan = await pool.query("SELECT * FROM permintaan_layanan WHERE id_permintaan = $1", [req.params.id]);

    res.status(200).json({
      status: "ok",
      data: detailLayanan.rows,
    });
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/jenis-sampah/:id", authorization, async (req, res) => {
  try {
    const jenisSampah = await pool.query("SELECT * FROM jenis_sampah WHERE id_permintaan = $1", [req.params.id]);

    console.log(jenisSampah);

    res.status(200).json({
      status: "ok",
      data: jenisSampah.rows,
    });
  } catch (error) {
    console.error(error.message);
  }
});

router.delete("/:id", authorization, async (req, res) => {
  try {
    console.log(req.params.id);
    const deleteJenisSampah = await pool.query("DELETE FROM jenis_sampah WHERE id_permintaan = $1", [req.params.id]);
    const deleteLayanan = await pool.query("DELETE FROM permintaan_layanan WHERE id_permintaan = $1", [req.params.id]);

    res.status(200).json({
      status: "ok",
      msg: "deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
  }
});

router.put("/ganti-status/:id", authorization, async (req, res) => {
  try {
    console.log(req.body);
    const gantiStatus = await pool.query("UPDATE permintaan_layanan SET status_layanan = $1 WHERE id_permintaan = $2", [req.body.value, req.params.id]);

    res.status(200).json({
      status: "ok",
      msg: "updated successfully",
    });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
