const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const { body, validationResult, check } = require("express-validator");
const authorization = require("../middleware/authorization");
const bcryptPassword = require("../utils/bcryptPassword");

// register route
router.post(
  "/register",
  [body("password").isLength({ min: 8 }).withMessage("Password harus minimal 8 karakter"), body("email_pengguna").isEmail().withMessage("Email tidak valid"), body("no_hp_pengguna").isMobilePhone().withMessage("No handphone tidak valid")],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      console.log(errors.errors.length);
      if (errors.errors.length !== 0) {
        console.log(errors);
        res.status(401).json(errors);
        return;
      }
      // destructuring req.body
      const { username_pengguna, password, nama_depan_pengguna, nama_belakang_pengguna, email_pengguna, no_hp_pengguna, alamat_pengguna, role } = req.body;

      // check if user exists
      const user = await pool.query("SELECT * FROM pengguna WHERE username_pengguna=$1", [username_pengguna]);

      if (user.rows.length !== 0) {
        return res.status(401).json("user already exist");
      }

      // bycrypting password
      const bcryptPassword = bcryptPassword(password);

      const newPengguna = await pool.query("INSERT INTO pengguna (username_pengguna, password, nama_depan_pengguna, nama_belakang_pengguna, email_pengguna, no_hp_pengguna, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [
        username_pengguna,
        bcryptPassword,
        nama_depan_pengguna,
        nama_belakang_pengguna,
        email_pengguna,
        no_hp_pengguna,
        role,
      ]);

      const initializeAlamat = await pool.query("INSERT INTO alamat (username_pengguna) VALUES ($1)", [username_pengguna]);

      const token = jwtGenerator(newPengguna.rows[0].username_pengguna);

      res.status(201).json({ token });
    } catch (err) {
      console.error(err.message);
    }
  }
);

// login router
router.post("/login", async (req, res) => {
  try {
    // destructure req.body
    const { username, password } = req.body;

    const pengguna = await pool.query("SELECT * FROM pengguna WHERE username_pengguna = $1", [username]);

    if (pengguna.rows.length === 0) {
      return res.status(401).json("Username atau password salah!");
    }

    const validPassword = await bcrypt.compare(password, pengguna.rows[0].password);

    if (!validPassword) {
      return res.status(401).json("Username atau password salah");
    }

    const token = jwtGenerator(pengguna.rows[0].username_pengguna, pengguna.rows[0].role);

    res.json({
      token,
    });
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
