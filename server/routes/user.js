const express = require('express');
const router = express.Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const bcryptPassword = require('../utils/bcryptPassword');

router.get('/', authorization, async (req, res) => {
  try {
    const user = await pool.query('SELECT * FROM pengguna WHERE username_pengguna = $1', [req.user]);

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

module.exports = router;

router.put('/', authorization, [body('email').isEmail().withMessage('Email tidak valid'), body('noHp').isMobilePhone('id-ID').withMessage('Nomor handphone tidak valid')], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.errors.length !== 0) {
      return res.status(401).json(errors);
    }

    const { namaDepan, namaBelakang, email, noHp, role, username_pengguna } = req.body;

    const updateUser = await pool.query('UPDATE pengguna SET nama_depan_pengguna = $1, nama_belakang_pengguna = $2, email_pengguna = $3, no_hp_pengguna = $4, role = $5 WHERE username_pengguna = $6', [
      namaDepan,
      namaBelakang,
      email,
      noHp,
      role,
      username_pengguna,
    ]);

    res.status(200).json({ status: 'success', msg: 'Updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/address', authorization, async (req, res) => {
  try {
    const alamat = await pool.query('SELECT * FROM alamat WHERE username_pengguna = $1', [req.user]);

    res.json(alamat.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/address', authorization, async (req, res) => {
  try {
    const { kecamatan, kelurahan, keteranganAlamat } = req.body;

    const updateAddress = await pool.query('UPDATE alamat SET kecamatan = $1, kelurahan = $2, keterangan_alamat = $3 WHERE username_pengguna = $4', [kecamatan, kelurahan, keteranganAlamat, req.user]);

    res.status(200).json({ status: 'ok', msg: 'updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/changepassword', authorization, [body('newPassword').isLength({ min: 8 }).withMessage('Password harus minimal 8 karakter')], async (req, res) => {
  try {
    const { newPass } = req.body;

    console.log(newPass);

    const pengguna = await pool.query('SELECT password FROM pengguna WHERE username_pengguna = $1', [req.user]);

    const cekDuplikat = await bcrypt.compare(newPass, pengguna.rows[0].password);
    if (cekDuplikat) {
      console.log(cekDuplikat);
      return res.status(401).json({ error: 'duplicate password' });
    }

    // bycrypting password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(newPass, salt);

    const insertNewPassword = await pool.query('UPDATE pengguna SET password = $1 WHERE username_pengguna = $2', [bcryptPassword, req.user]);

    res.status(200).json({ status: 'ok', msg: 'updated successfully' });
  } catch (error) {
    console.error(error.message);
  }
});

router.get('/all', authorization, async (req, res) => {
  try {
    const user = await pool.query('SELECT * FROM pengguna');

    res.status(200).json({
      status: 'OK',
      data: user.rows,
    });
  } catch (error) {
    console.error(error.message);
  }
});

router.post(
  '/admin',
  authorization,
  [
    body('username_pengguna').custom(async (value) => {
      const duplicateUsername = await pool.query('SELECT * FROM pengguna WHERE username_pengguna = $1', [value]);

      if (duplicateUsername.rows.length !== 0) {
        throw new Error('Username sudah digunakan');
      }
    }),
    body('password').isLength({ min: 8 }).withMessage('Password harus minimal 8 karakter'),
    body('email_pengguna').isEmail().withMessage('Email tidak valid'),
    body('no_hp_pengguna').isMobilePhone('id-ID').withMessage('Nomor handphone tidak valid'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (errors.errors.length !== 0) {
        return res.status(401).json(errors);
      }

      const { username_pengguna, email_pengguna, password, nama_depan_pengguna, nama_belakang_pengguna, no_hp_pengguna, role } = req.body;

      const duplicateUsername = await pool.query('SELECT * FROM pengguna WHERE username_pengguna = $1', [username_pengguna]);

      if (duplicateUsername.rows.length !== 0) {
        return res.status(400).json({
          status: 'bad request',
          msg: 'duplicate username',
        });
      }

      const bcryptedPassword = await bcryptPassword(password);
      console.log(bcryptedPassword);

      const newAdmin = await pool.query('INSERT INTO pengguna (username_pengguna, email_pengguna, password, nama_depan_pengguna, nama_belakang_pengguna, no_hp_pengguna, role, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [
        username_pengguna,
        email_pengguna,
        bcryptedPassword,
        nama_depan_pengguna,
        nama_belakang_pengguna,
        no_hp_pengguna,
        role,
        'aktif',
      ]);

      res.status(201).json({
        status: 'created',
      });
    } catch (error) {
      console.error(error.message);
    }
  }
);
