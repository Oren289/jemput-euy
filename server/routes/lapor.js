const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
  try {
    const semuaAduan = await pool.query('SELECT * FROM data_aduan ORDER BY tanggal_aduan DESC');

    res.status(200).json({
      status: 'ok',
      data: semuaAduan.rows,
    });
  } catch (error) {
    console.error(error.message);
  }
});

router.post('/', [body('nomor_kontak').isMobilePhone().withMessage('No handphone tidak valid')], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.errors.length !== 0) {
      console.log(errors);
      res.status(401).json(errors);
      return;
    }

    const { nama_pelapor, nomor_kontak, deskripsi, alamat_lokasi, jenis_aduan } = req.body;

    const newLaporan = await pool.query('INSERT INTO data_aduan (nama_pelapor, nomor_kontak, deskripsi, alamat_lokasi, jenis_aduan) VALUES ($1, $2, $3, $4, $5)', [nama_pelapor, nomor_kontak, deskripsi, alamat_lokasi, jenis_aduan]);

    res.status(201).json({ status: 'ok' });
  } catch (error) {
    console.error(error.message);
  }
});

router.get('/:id', authorization, async (req, res) => {
  try {
    const aduan = await pool.query('SELECT * FROM data_aduan WHERE id_aduan = $1', [req.params.id]);

    console.log(aduan.rows);

    res.status(200).json({
      status: 'ok',
      data: aduan.rows,
    });
  } catch (error) {
    console.error(error.message);
  }
});

router.delete('/:id', authorization, async (req, res) => {
  try {
    const aduan = await pool.query('DELETE FROM data_aduan WHERE id_aduan = $1', [req.params.id]);

    res.status(200).json({
      status: 'ok',
      msg: 'deleted successfully',
    });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
