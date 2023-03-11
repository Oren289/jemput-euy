const express = require("express");
const router = express.Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM pengguna WHERE username_pengguna = $1", [req.user]);

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

module.exports = router;

router.put("/", authorization, [body("email").isEmail().withMessage("Email tidak valid"), body("noHp").isMobilePhone().withMessage("Nomor handphone tidak valid")], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.errors.length !== 0) {
      return res.status(401).json(errors);
    }

    const { namaDepan, namaBelakang, email, noHp, username_pengguna } = req.body;

    const updateUser = await pool.query("UPDATE pengguna SET nama_depan_pengguna = $1, nama_belakang_pengguna = $2, email_pengguna = $3, no_hp_pengguna = $4 WHERE username_pengguna = $5", [
      namaDepan,
      namaBelakang,
      email,
      noHp,
      username_pengguna,
    ]);

    res.status(200).json({ status: "success", msg: "Updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/address", authorization, async (req, res) => {
  try {
    const alamat = await pool.query("SELECT * FROM alamat WHERE username_pengguna = $1", [req.user]);

    res.json(alamat.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/address", authorization, async (req, res) => {
  try {
    const { kecamatan, kelurahan, keteranganAlamat } = req.body;

    const updateAddress = await pool.query("UPDATE alamat SET kecamatan = $1, kelurahan = $2, keterangan_alamat = $3 WHERE username_pengguna = $4", [kecamatan, kelurahan, keteranganAlamat, req.user]);

    res.status(200).json({ status: "ok", msg: "updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/changepassword", authorization, [body("newPassword").isLength({ min: 8 }).withMessage("Password harus minimal 8 karakter")], async (req, res) => {
  try {
    const { newPass } = req.body;

    console.log(newPass);

    const pengguna = await pool.query("SELECT password FROM pengguna WHERE username_pengguna = $1", [req.user]);

    const cekDuplikat = await bcrypt.compare(newPass, pengguna.rows[0].password);
    if (cekDuplikat) {
      console.log(cekDuplikat);
      return res.status(401).json({ error: "duplicate password" });
    }

    // bycrypting password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(newPass, salt);

    const insertNewPassword = await pool.query("UPDATE pengguna SET password = $1 WHERE username_pengguna = $2", [bcryptPassword, req.user]);

    res.status(200).json({ status: "ok", msg: "updated successfully" });
  } catch (error) {
    console.error(error.message);
  }
});
