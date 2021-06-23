"use strict";

var response = require("./res");
var connection = require("./koneksi");

exports.index = function (req, res) {
  response.ok("Aplikasi berjalan", res);
};

//menampilkan semua data mahasiswa
exports.tampilsemuamahasiswa = function (req, res) {
  connection.query("SELECT * FROM mahasiswa", function (error, rows, field) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//menampilkann berdasarkan id
exports.tampilbedasarkanid = function (req, res) {
  let id = req.params.id;
  connection.query(
    "SELECT * FROM mahasiswa WHERE id_mahasiswa = ?",
    [id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//menambahkan data mahasiswa
exports.tambahMahasiswa = function (req, res) {
  var nim = req.body.nim;
  var nama = req.body.nama;
  var jurusan = req.body.jurusan;
  connection.query(
    "INSERT INTO mahasiswa (nim,nama,jurusan) VALUES (?,?,?)",
    [nim, nama, jurusan],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Menambahkan Data!", res);
      }
    }
  );
};

//mengubah data berdasarkan id
exports.ubahMahasiswa = function (req, res) {
  var id = req.body.id_mahasiswa;
  var nim = req.body.nim;
  var nama = req.body.nama;
  var jurusan = req.body.jurusan;

  connection.query(
    "UPDATE mahasiswa set nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?",
    [nim, nama, jurusan, id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Mengubah Data!", res);
      }
    }
  );
};

//menghapus data berdasarkan id
exports.hapusMahasiswa = function (req, res) {
  var id = req.body.id_mahasiswa;
  connection.query(
    "DELETE FROM mahasiswa WHERE id_mahasiswa=?",
    [id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil hapus data", res);
      }
    }
  );
};

//menampilakn matakuliah group
exports.tampilgroupmatakuliah = function (req, res) {
  connection.query(
    "SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks from krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa",
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.oknested(rows, res);
      }
    }
  );
};

/*===================BARANG=================*/

//menambahkan data barang
exports.tambahBarang = function (req, res) {
  var id_kategori = req.body.id_kategori;
  var id_status = req.body.id_status;
  var nama = req.body.nama;
  var harga = req.body.harga;
  var gambar = req.body.gambar;
  var keterangan = req.body.keterangan;
  connection.query(
    "INSERT INTO barang (id_kategori, id_status, nama, harga, gambar, keterangan) VALUES (?, ?, ?, ?, ?, ?)",
    [id_kategori, id_status, nama, harga, gambar, keterangan],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Menambahkan Data!", res);
      }
    }
  );
};

//menampilkan semua data barang
exports.tampilBarang = function (req, res) {
  connection.query(
    "SELECT barang.id_barang, barang.gambar, barang.nama, barang.harga, barang.keterangan, status.status_barang, kategori.kategori_barang FROM barang JOIN kategori JOIN status WHERE barang.id_kategori = kategori.id AND barang.id_status = status.id_status ORDER BY barang.id_barang",
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//menghapus data barang berdasarkan id
exports.hapusBarang = function (req, res) {
  var id = req.body.id_barang;
  connection.query(
    "DELETE FROM barang WHERE id_barang=?",
    [id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil hapus data", res);
      }
    }
  );
};

//menampilkan data barang berdasarkan id
exports.tampilbarangid = function (req, res) {
  let id = req.params.id;
  connection.query(
    "SELECT * FROM barang WHERE id_barang=?",
    [id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//menampilkan data barang berdasarkan id kategori
exports.tampilbarangidkategori = function (req, res) {
  let id = req.params.id;
  connection.query(
    "SELECT * FROM barang join status join kategori WHERE barang.id_kategori=kategori.id AND barang.id_status = status.id_status AND id_kategori=?",
    [id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//menampilkan semua data status
exports.tampilStatus = function (req, res) {
  connection.query("SELECT * FROM status", function (error, rows, field) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};
//menampilkan semua data kategori
exports.tampilKategori = function (req, res) {
  connection.query("SELECT * FROM kategori", function (error, rows, field) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//mengubah data barang berdasarkan id
exports.ubahBarang = function (req, res) {
  var id = req.body.id_barang;
  var id_kategori = req.body.id_kategori;
  var id_status = req.body.id_status;
  var nama = req.body.nama;
  var harga = req.body.harga;
  var keterangan = req.body.keterangan;

  connection.query(
    "UPDATE barang SET id_kategori = ?, id_status = ?, nama = ?, harga = ?, keterangan = ? WHERE barang.id_barang = ?",
    [id_kategori, id_status, nama, harga, keterangan, id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Mengubah Data!", res);
      }
    }
  );
};

/*===================SIMPANAN=================*/

//menampilkan semua data simpanan
exports.tampilSimpanan = function (req, res) {
  connection.query(
    "SELECT simpan.id_simpanan, simpan.id_user, simpan.jumlah_simpanan, simpan.terbilang, simpan.tanggal_simpan, user.id, user.username FROM simpan JOIN user WHERE simpan.id_user = user.id ORDER BY simpan.tanggal_simpan DESC",
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//menambahkan simpanan
exports.tambahSimpanan = function (req, res) {
  var id_user = req.body.id_user;
  var jumlah_simpanan = req.body.jumlah_simpanan;
  var terbilang = req.body.terbilang;
  var tanggal_simpan = req.body.tanggal_simpan;
  // var bukti_transfer = req.body.bukti_transfer;
  connection.query(
    "INSERT INTO simpan (id_user, jumlah_simpanan, terbilang, tanggal_simpan) VALUES (?, ?, ?, ?)",
    [id_user, jumlah_simpanan, terbilang, tanggal_simpan],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Menambahkan Data!", res);
      }
    }
  );
};

//menghapus data simpanan berdasarkan id
exports.hapusSimpanan = function (req, res) {
  var id = req.body.id_simpanan;
  connection.query(
    "DELETE FROM simpan WHERE id_simpanan=?",
    [id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil hapus data", res);
      }
    }
  );
};

//menampilkan data simpanan berdasarkan id
exports.tampilsimpananid = function (req, res) {
  let id = req.params.id;
  connection.query(
    "SELECT * FROM simpan join user WHERE simpan.id_user = user.id AND id_simpanan=?",
    [id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//ubah data simpanan
exports.ubahSimpanan = function (req, res) {
  var id = req.body.id_simpanan;
  var jumlah_simpanan = req.body.jumlah_simpanan;
  var terbilang = req.body.terbilang;

  connection.query(
    "UPDATE simpan SET jumlah_simpanan = ?, terbilang = ? WHERE simpan.id_simpanan = ?",
    [jumlah_simpanan, terbilang, id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Mengubah Data!", res);
      }
    }
  );
};

//tampil simpanan user id
exports.tampilsimpananiduser = function (req, res) {
  let id_user = req.params.id_user;
  connection.query(
    "SELECT * FROM simpan join user WHERE simpan.id_user = user.id AND id_user=? ORDER BY tanggal_simpan DESC",
    [id_user],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

/*===================KREDIT=================*/

//menambahkan data kredit
exports.tambahKredit = function (req, res) {
  var id_user = req.body.id_user;
  var id_status = req.body.id_status;
  var id_cicilan = req.body.id_cicilan;
  var satker = req.body.satker;
  var nomor_telefon = req.body.nomor_telefon;
  var nama_barang = req.body.nama_barang;
  var harga = req.body.harga;
  var terbilang = req.body.terbilang;
  // var besar_cicilan = req.body.besar_cicilan;
  var tanggal_kredit = req.body.tanggal_kredit;
  connection.query(
    "INSERT INTO kredit (id_user, id_status, id_cicil, satker, nomor_telefon, nama_barang, harga, terbilang, tanggal_kredit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      id_user,
      id_status,
      id_cicilan,
      satker,
      nomor_telefon,
      nama_barang,
      harga,
      terbilang,
      tanggal_kredit,
    ],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Menambahkan Data!", res);
      }
    }
  );
};

//menampilkan status
exports.tampilStatusKP = function (req, res) {
  connection.query(
    "SELECT * FROM status_kredit_pinjaman",
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//menampilkan cicilan berdasarkan tipe
exports.tampilCicilan = function (req, res) {
  let tipe_cicilan = req.params.tipe_cicilan;
  connection.query(
    "SELECT * FROM cicilan WHERE cicilan.tipe_cicilan = ?",
    [tipe_cicilan],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//menampilkan cicilan
exports.tampilAllCicilan = function (req, res) {
  connection.query("SELECT * FROM cicilan", function (error, rows, field) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//menampilkan data kredit
exports.tampilkredit = function (req, res) {
  connection.query(
    "SELECT * FROM kredit join user join status_kredit_pinjaman join cicilan WHERE kredit.id_user = user.id AND kredit.id_status = status_kredit_pinjaman.id_statusKP AND kredit.id_cicil = cicilan.id_cicilan ORDER BY kredit.tanggal_kredit DESC",
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//menampilkan data kredit berdasarkan id user
exports.tampilkreditiduser = function (req, res) {
  let id_user = req.params.id_user;
  connection.query(
    "SELECT * FROM kredit join user join status_kredit_pinjaman WHERE kredit.id_user = user.id AND kredit.id_status = status_kredit_pinjaman.id_statusKP AND id_user=? ORDER BY tanggal_kredit DESC",
    [id_user],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//menampilkan data kredit berdasarkan id
exports.tampilkreditid = function (req, res) {
  let id = req.params.id;
  connection.query(
    "SELECT * FROM kredit join user WHERE kredit.id_user = user.id AND id_kredit=?",
    [id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//hapus data kredit
exports.hapusKredit = function (req, res) {
  var id = req.body.id_kredit;
  connection.query(
    "DELETE FROM kredit WHERE id_kredit=?",
    [id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil hapus data", res);
      }
    }
  );
};

//ubah data kredit
exports.ubahKredit = function (req, res) {
  var id = req.body.id_kredit;
  var id_cicil = req.body.id_cicil;
  var id_status = req.body.id_status;
  var satker = req.body.satker;
  var nomor_telefon = req.body.nomor_telefon;
  var nama_barang = req.body.nama_barang;
  var harga = req.body.harga;
  var terbilang = req.body.terbilang;
  var besar_cicilan = req.body.besar_cicilan;
  connection.query(
    "UPDATE kredit SET id_cicil = ?, id_status = ?, satker = ?, nomor_telefon = ?, nama_barang = ?, harga = ?, terbilang = ?, besar_cicilan = ? WHERE kredit.id_kredit = ?",
    [
      id_cicil,
      id_status,
      satker,
      nomor_telefon,
      nama_barang,
      harga,
      terbilang,
      besar_cicilan,
      id,
    ],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Mengubah Data!", res);
      }
    }
  );
};

/*===================PINJAMAN=================*/
//menampilkan cicilan
exports.tampilPeraturan = function (req, res) {
  connection.query("SELECT * FROM peraturan", function (error, rows, field) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//menambahkan data pinjaman
exports.tambahPinjaman = function (req, res) {
  var id_user = req.body.id_user;
  var id_status = req.body.id_status;
  var id_cicil = req.body.id_cicil;
  var satker = req.body.satker;
  var nomor_telefon = req.body.nomor_telefon;
  var besar_pinjaman = req.body.besar_pinjaman;
  var terbilang = req.body.terbilang;
  var keperluan = req.body.keperluan;
  // var besar_cicilan = req.body.besar_cicilan;
  // var kta = req.body.kta;
  // var ktp_pemohon = req.body.ktp_pemohon;
  // var ktp_pasangan = req.body.ktp_pasangan;
  // var slip_gaji = req.body.slip_gaji;
  // var rincian_gaji = req.body.rincian_gaji;
  // var kk = req.body.kk;
  // var spk = req.body.spk;
  // var asuransi = req.body.asuransi;
  // var bebas_hutang = req.body.bebas_hutang;
  var tanggal_pinjam = req.body.tanggal_pinjam;
  connection.query(
    "INSERT INTO pinjaman (id_user, id_status, id_cicil, satker, nomor_telefon, besar_pinjaman, terbilang, keperluan, tanggal_pinjam) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      id_user,
      id_status,
      id_cicil,
      satker,
      nomor_telefon,
      besar_pinjaman,
      terbilang,
      keperluan,
      tanggal_pinjam,
    ],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Menambahkan Data!", res);
      }
    }
  );
};

//menampilkan data pinjaman
exports.tampilPinjaman = function (req, res) {
  connection.query(
    "SELECT * FROM pinjaman join user join status_kredit_pinjaman join cicilan WHERE pinjaman.id_user = user.id AND pinjaman.id_status = status_kredit_pinjaman.id_statusKP AND pinjaman.id_cicil = cicilan.id_cicilan ORDER BY pinjaman.tanggal_pinjam DESC",
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//hapus data pinjaman
exports.hapusPinjaman = function (req, res) {
  var id = req.body.id_pinjaman;
  connection.query(
    "DELETE FROM pinjaman WHERE id_pinjaman=?",
    [id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil hapus data", res);
      }
    }
  );
};

//menampilkan data pinjaman berdasarkan id
exports.tampilpinjamanid = function (req, res) {
  let id = req.params.id;
  connection.query(
    "SELECT * FROM pinjaman join user WHERE pinjaman.id_user = user.id AND id_pinjaman=?",
    [id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//menampilkan data pinjaman berdasarkan id user
exports.tampilpinjamaniduser = function (req, res) {
  let id_user = req.params.id_user;
  connection.query(
    "SELECT * FROM pinjaman join user join status_kredit_pinjaman WHERE pinjaman.id_user = user.id AND pinjaman.id_status = status_kredit_pinjaman.id_statusKP AND id_user=? ORDER BY tanggal_pinjam DESC",
    [id_user],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//ubah data pinjaman
exports.ubahPinjaman = function (req, res) {
  var id = req.body.id_pinjaman;
  var id_cicil = req.body.id_cicil;
  var id_status = req.body.id_status;
  var satker = req.body.satker;
  var nomor_telefon = req.body.nomor_telefon;
  var besar_pinjaman = req.body.besar_pinjaman;
  var terbilang = req.body.terbilang;
  var keperluan = req.body.keperluan;
  var besar_cicilan = req.body.besar_cicilan;
  connection.query(
    "UPDATE pinjaman SET id_cicil = ?, id_status = ?, satker = ?, nomor_telefon = ?, besar_pinjaman = ?, terbilang = ?, keperluan = ?, besar_cicilan = ? WHERE pinjaman.id_pinjaman = ?",
    [
      id_cicil,
      id_status,
      satker,
      nomor_telefon,
      besar_pinjaman,
      terbilang,
      keperluan,
      besar_cicilan,
      id,
    ],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Mengubah Data!", res);
      }
    }
  );
};

/*===================TOKO=================*/

//menampilkan kategori barang
exports.tampilKategori = function (req, res) {
  connection.query(
    "SELECT * FROM kategori ORDER BY kategori.id",
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//menambahkan keranjang
exports.tambahKeranjang = function (req, res) {
  var id_user = req.body.id_user;
  var id_barang = req.body.id_barang;
  var jumlah_harga = req.body.jumlah_harga;
  var total_harga = req.body.total_harga;
  var jumlah = req.body.jumlah;
  var status = req.body.status
  var tanggal_penjualan = req.body.tanggal_penjualan;
  connection.query(
    "INSERT INTO keranjang (id_user, id_barang, jumlah_harga, total_harga, jumlah, status, tanggal_penjualan) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id_user, id_barang, jumlah_harga, total_harga, jumlah, status, tanggal_penjualan],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Menambahkan Data!", res);
      }
    }
  );
};

//menampilkan keranjang id user
exports.tampilKeranjangId = function (req, res) {
  let id_user = req.params.id_user;
  connection.query(
    "SELECT * FROM keranjang join barang join user WHERE keranjang.id_barang = barang.id_barang AND keranjang.id_user = user.id AND keranjang.id_user = ? ORDER BY keranjang.id",
    [id_user],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//menampilkan keranjang id barang
exports.tampilKeranjangIdBarang = function (req, res) {
  let id_barang = req.params.id_barang;
  connection.query(
    "SELECT * FROM keranjang join barang join user WHERE keranjang.id_barang = barang.id_barang AND keranjang.id_user = user.id AND keranjang.id_barang = ? ORDER BY keranjang.id",
    [id_barang],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//ubah keranjang
exports.ubahKeranjang = function (req, res) {
  var id_barang = req.body.id_barang;
  var jumlah_harga = req.body.jumlah_harga;
  var total_harga = req.body.total_harga;
  var jumlah = req.body.jumlah;
  connection.query(
    "UPDATE keranjang SET jumlah_harga = ?, total_harga = ?, jumlah = ? WHERE keranjang.id_barang = ?",
    [jumlah_harga, total_harga, jumlah, id_barang],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Mengubah Data!", res);
      }
    }
  );
};

//menampilkan total harga id user
exports.totalHarga = function (req, res) {
  let id_user = req.params.id_user;
  connection.query(
    "SELECT SUM(jumlah_harga) AS total_harga FROM keranjang WHERE id_user = ?",
    [id_user],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//hapus list keranjang
exports.hapusKeranjangId = function (req, res) {
  var id = req.body.id_barang;
  connection.query(
    "DELETE FROM keranjang WHERE id_barang = ?",
    [id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil hapus data", res);
      }
    }
  );
};

//hapus list keranjang
exports.hapusKeranjangIdUser = function (req, res) {
  var id = req.body.id_user;
  connection.query(
    "DELETE FROM keranjang WHERE id_user = ?",
    [id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil hapus data", res);
      }
    }
  );
};

//tambah data penjualan
exports.tambahPenjualan = function (req, res) {
  var values = [
    {
      id_barang: req.body.id_barang,
      id_user: req.body.id_user,
      jumlah: req.body.jumlah,
      jumlah_harga: req.body.jumlah_harga,
      status: req.body.status,
      tanggal_penjualan: req.body.tanggal_penjualan,      
    },
  ];
  connection.query(
    "INSERT INTO penjualan (id_barang, id_user, jumlah, jumlah_harga, status, tanggal_penjualan) VALUES ?",
    [
      values.map((values) => [
        values.id_barang,
        values.id_user,
        values.jumlah,
        values.jumlah_harga,
        values.status,
        values.tanggal_penjualan
      ]),
    ],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Menambahkan Data!", res);
      }
    }
  );
};

//menampilkan keranjang id user
exports.tampilKeranjangIdUser = function (req, res) {
  let id_user = req.params.id_user;
  connection.query(
    "SELECT keranjang.id_barang, keranjang.id_user, jumlah_harga, jumlah, tanggal_penjualan, status FROM keranjang join barang join user WHERE keranjang.id_barang = barang.id_barang AND keranjang.id_user = user.id AND keranjang.id_user = ? ORDER BY keranjang.id",
    [id_user],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//menampilkan semua data penjualan
exports.tampilPenjualan = function (req, res) {
  connection.query(
    "SELECT * FROM penjualan join barang join user WHERE penjualan.id_barang = barang.id_barang AND penjualan.id_user = user.id ORDER BY penjualan.id_penjualan",
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//hapus list penjualan
exports.hapusPenjualan = function (req, res) {
  var id = req.body.id_penjualan;
  connection.query(
    "DELETE FROM penjualan WHERE penjualan.id_penjualan = ?",
    [id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil hapus data", res);
      }
    }
  );
};

//menampilkan semua data user
exports.tampilUser = function (req, res) {
  connection.query(
    "SELECT * FROM user ORDER BY user.tanggal_daftar DESC",
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//hapus user
exports.hapusUser = function (req, res) {
  var id = req.body.id;
  connection.query(
    "DELETE FROM user WHERE user.id = ?",
    [id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil hapus data", res);
      }
    }
  );
};
