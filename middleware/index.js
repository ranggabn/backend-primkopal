var express = require('express');
var auth = require('./auth');
var router = express.Router();
var verifikasi = require('./verifikasi');

router.post('/api/v1/register', auth.reqistrasi);
router.post('/api/v1/login', auth.login);
router.post('/api/v1/ubahpassword', auth.ubahpassword);
router.post('/api/v1/resetpassword', auth.resetpassword);
// router.post('/api/v1/ubahprofil', auth.ubahprofil);

//alamat yang perlu otorisasi
router.get('/api/v1/rahasia', verifikasi(), auth.halamanrahasia);
// router.get('/api/v1/admin/mahasiswa', verifikasi(1), auth.adminmahasiswa);

module.exports = router;