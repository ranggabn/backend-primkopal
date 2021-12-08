"use strict";

var response = require("./res");
var connection = require("./koneksi");
const md5 = require("md5");

exports.index = function (req, res) {
  response.ok("Aplikasi berjalan", res);
};

/*===================BARANG=================*/

//menambahkan data barang
exports.tambahBarang = function (req, res) {
  var id_kategori = req.body.id_kategori;
  var id_status = req.body.id_status;
  var nama = req.body.nama;
  var harga = req.body.harga;
  var stok = req.body.stok;
  var gambar = req.body.gambar;
  var keterangan = req.body.keterangan;
  connection.query(
    "INSERT INTO barang (id_kategori, id_status, nama, harga, stok, gambar, keterangan) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id_kategori, id_status, nama, harga, stok, gambar, keterangan],
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
    "SELECT barang.id_barang, barang.gambar, barang.nama, barang.harga, barang.stok, barang.keterangan, status.status_barang, kategori.kategori_barang FROM barang JOIN kategori JOIN status WHERE barang.id_kategori = kategori.id AND barang.id_status = status.id_status ORDER BY barang.id_barang",
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
  var nama = req.body.nama;
  var harga = req.body.harga;
  var stok = req.body.stok;
  var keterangan = req.body.keterangan;
  var gambar = req.body.gambar;
  connection.query(
    "UPDATE barang SET id_kategori = ?, nama = ?, harga = ?, stok = ?, keterangan = ?, gambar = ? WHERE barang.id_barang = ?",
    [id_kategori, nama, harga, stok, keterangan, gambar, id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Mengubah Data!", res);
      }
    }
  );
};

exports.ubahBarang2 = function (req, res) {
  var id = req.body.id_barang;
  var stok = req.body.stok;
  connection.query(
    "UPDATE barang set stok = ? WHERE id_barang = ?",
    [stok, id],
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
    "SELECT simpan.id_simpanan, simpan.id_user, simpan.jumlah_simpanan, simpan.penarikan, simpan.keterangan, simpan.tanggal_simpan, user.id, user.username FROM simpan JOIN user WHERE simpan.id_user = user.id ORDER BY simpan.id_simpanan DESC",
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
  var bukti_transfer = req.body.bukti_transfer;
  connection.query(
    "INSERT INTO simpan (id_user, jumlah_simpanan, terbilang, tanggal_simpan, bukti_transfer) VALUES (?, ?, ?, ?, ?)",
    [id_user, jumlah_simpanan, terbilang, tanggal_simpan, bukti_transfer],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Menambahkan Data!", res);
      }
    }
  );
};

//menambahkan penarikan
exports.tambahPenarikan = function (req, res) {
  var id_user = req.body.id_user;
  var penarikan = req.body.penarikan;
  var terbilang = req.body.terbilang;
  var keterangan = req.body.keterangan;
  var tanggal_simpan = req.body.tanggal_simpan;
  connection.query(
    "INSERT INTO simpan (id_user, penarikan, terbilang, keterangan, tanggal_simpan) VALUES (?, ?, ?, ?, ?)",
    [id_user, penarikan, terbilang, keterangan, tanggal_simpan],
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
    "SELECT * FROM simpan WHERE id_simpanan=?",
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
  var keterangan = req.body.keterangan;
  connection.query(
    "UPDATE simpan SET jumlah_simpanan = ?, terbilang = ?, keterangan = ? WHERE simpan.id_simpanan = ?",
    [jumlah_simpanan, terbilang, keterangan, id],
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
    "SELECT * FROM simpan join user WHERE simpan.id_user = user.id AND id_user=? ORDER BY id_simpanan DESC",
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

exports.totalSaldo = function (req, res) {
  let id_user = req.params.id_user;
  connection.query(
    "SELECT SUM(jumlah_simpanan) AS total_saldo FROM simpan WHERE id_user=?",
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

exports.totalPenarikan = function (req, res) {
  let id_user = req.params.id_user;
  connection.query(
    "SELECT SUM(penarikan) AS total_penarikan FROM simpan WHERE id_user=?",
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
  var id_cicilan = req.body.id_cicilan;
  var nama_barang = req.body.nama_barang;
  var harga = req.body.harga;
  var terbilang = req.body.terbilang;
  var besar_cicilan = req.body.besar_cicilan;
  var tanggal_kredit = req.body.tanggal_kredit;
  connection.query(
    "INSERT INTO kredit (id_user, id_cicil, nama_barang, harga, terbilang, besar_cicilan, tanggal_kredit) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      id_user,
      id_cicilan,
      nama_barang,
      harga,
      terbilang,
      besar_cicilan,
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

exports.tampilCicilan2 = function (req, res) {
  connection.query(
    "SELECT * FROM cicilan WHERE cicilan.tipe_cicilan IN (1,2) ",
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
    "SELECT * FROM kredit join user join cicilan WHERE kredit.id_user = user.id AND kredit.id_cicil = cicilan.id_cicilan ORDER BY kredit.tanggal_kredit DESC",
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
    "SELECT * FROM kredit join user WHERE kredit.id_user = user.id AND id_user=? ORDER BY tanggal_kredit DESC",
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
  var nama_barang = req.body.nama_barang;
  var harga = req.body.harga;
  var terbilang = req.body.terbilang;
  var besar_cicilan = req.body.besar_cicilan;
  var status = req.body.status;
  connection.query(
    "UPDATE kredit SET id_cicil = ?, nama_barang = ?, harga = ?, terbilang = ?, besar_cicilan = ?, status = ? WHERE kredit.id_kredit = ?",
    [id_cicil, nama_barang, harga, terbilang, besar_cicilan, status, id],
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
  var id_cicil = req.body.id_cicil;
  var besar_pinjaman = req.body.besar_pinjaman;
  var terbilang = req.body.terbilang;
  var besar_cicilan = req.body.besar_cicilan;
  var keperluan = req.body.keperluan;
  var persyaratan = req.body.persyaratan;
  var tanggal_pinjam = req.body.tanggal_pinjam;
  connection.query(
    "INSERT INTO pinjaman (id_user, id_cicil, besar_pinjaman, terbilang, besar_cicilan, keperluan, persyaratan, tanggal_pinjam) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      id_user,
      id_cicil,
      besar_pinjaman,
      terbilang,
      besar_cicilan,
      keperluan,
      persyaratan,
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
    "SELECT * FROM pinjaman join user join cicilan WHERE pinjaman.id_user = user.id AND pinjaman.id_cicil = cicilan.id_cicilan ORDER BY pinjaman.tanggal_pinjam DESC",
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
    "SELECT * FROM pinjaman join user WHERE pinjaman.id_user = user.id AND id_user=? ORDER BY tanggal_pinjam DESC",
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
  var besar_pinjaman = req.body.besar_pinjaman;
  var terbilang = req.body.terbilang;
  var keperluan = req.body.keperluan;
  var besar_cicilan = req.body.besar_cicilan;
  var status_kaprim = req.body.status_kaprim;
  var status_kasatker = req.body.status_kasatker;
  connection.query(
    "UPDATE pinjaman SET id_cicil = ?, besar_pinjaman = ?, terbilang = ?, keperluan = ?, besar_cicilan = ?, status_kaprim = ?, status_kasatker = ? WHERE pinjaman.id_pinjaman = ?",
    [
      id_cicil,
      besar_pinjaman,
      terbilang,
      keperluan,
      besar_cicilan,
      status_kaprim,
      status_kasatker,
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
  var status = req.body.status;
  var tanggal_penjualan = req.body.tanggal_penjualan;
  connection.query(
    "INSERT INTO keranjang (id_user, id_barang, jumlah_harga, total_harga, jumlah, status, tanggal_penjualan) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      id_user,
      id_barang,
      jumlah_harga,
      total_harga,
      jumlah,
      status,
      tanggal_penjualan,
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

//hapus list keranjang user
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

/*====================PENJUALAN==================*/

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
        values.tanggal_penjualan,
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

//tambah data pengambilan
exports.tambahPengambilan = function (req, res) {
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
    "INSERT INTO pengambilan (id_barang, id_user, jumlah, jumlah_harga, status, tanggal_penjualan) VALUES ?",
    [
      values.map((values) => [
        values.id_barang,
        values.id_user,
        values.jumlah,
        values.jumlah_harga,
        values.status,
        values.tanggal_penjualan,
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

//menampilkan semua data pengambilan
exports.tampilPengambilan = function (req, res) {
  connection.query(
    "SELECT * FROM pengambilan join barang join user WHERE pengambilan.id_barang = barang.id_barang AND pengambilan.id_user = user.id ORDER BY pengambilan.id_pengambilan",
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//tampil pengambilan id
exports.tampilPengambilanID = function (req, res) {
  let id = req.params.id_pengambilan;
  connection.query(
    "SELECT * FROM pengambilan WHERE id_pengambilan=?",
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

//menampilkan data barang berdasarkan id
exports.tampilPenjualanid = function (req, res) {
  let id = req.params.id;
  connection.query(
    "SELECT * FROM penjualan join barang join user WHERE penjualan.id_barang = barang.id_barang AND penjualan.id_user = user.id AND id_penjualan=?",
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

//ubah penjualan
exports.ubahPenjualan = function (req, res) {
  var id_user = req.body.id_user;
  var jumlah = req.body.jumlah;
  var jumlah_harga = req.body.jumlah_harga;
  var status = req.body.status;
  var id_penjualan = req.body.id_penjualan;
  connection.query(
    "UPDATE penjualan SET id_user = ?, jumlah = ?, jumlah_harga = ?, status = ? WHERE penjualan.id_penjualan = ?",
    [id_user, jumlah, jumlah_harga, status, id_penjualan],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Mengubah Data!", res);
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

//hapus list penjualan
exports.hapusPengambilan = function (req, res) {
  var id = req.body.id_pengambilan;
  connection.query(
    "DELETE FROM pengambilan WHERE pengambilan.id_pengambilan = ?",
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

// ===============Komplain===============
//menambahkan data komplain
exports.tambahKomplain = function (req, res) {
  var komplain = req.body.komplain;
  var tanggal = req.body.tanggal;
  connection.query(
    "INSERT INTO komplain (komplain, tanggal) VALUES (?, ?)",
    [komplain, tanggal],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Menambahkan Data!", res);
      }
    }
  );
};

//menampilkan komplain
exports.tampilKomplain = function (req, res) {
  connection.query(
    "SELECT * FROM komplain ORDER BY komplain.id_komplain DESC",
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

// =================User==============

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

//menampilkan semua data user
exports.tampilUserId = function (req, res) {
  let id = req.params.id;
  connection.query(
    "SELECT * FROM user WHERE user.id=?",
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

exports.tampilpassword = function (req, res) {
  let id = req.params.id;
  connection.query(
    "SELECT id, password FROM user WHERE user.id=?",
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

exports.tampilRole = function (req, res) {
  connection.query(
    "SELECT * FROM role ORDER BY role.id_role",
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

exports.tambahAnggota = function (req, res) {
  var id = req.body.id;
  var username = req.body.username;
  var satker = req.body.satker;
  var tempat_lahir = req.body.tempat_lahir;
  var tanggal_lahir = req.body.tanggal_lahir;
  var nomor_telefon = req.body.nomor_telefon;
  var role = req.body.role;
  var tanggal_daftar = req.body.tanggal_daftar;
  connection.query(
    "INSERT INTO user (id, username, satker, tempat_lahir, tanggal_lahir, nomor_telefon, role, tanggal_daftar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      id,
      username,
      satker,
      tempat_lahir,
      tanggal_lahir,
      nomor_telefon,
      role,
      tanggal_daftar,
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

//ubah anggota
exports.ubahAnggota = function (req, res) {
  var id = req.body.id;
  var username = req.body.username;
  var satker = req.body.satker;
  var tempat_lahir = req.body.tempat_lahir;
  var tanggal_lahir = req.body.tanggal_lahir;
  var nomor_telefon = req.body.nomor_telefon;
  var role = req.body.role;
  connection.query(
    "UPDATE user SET id = ?, username = ?, satker = ?, tempat_lahir = ?, tanggal_lahir = ?, nomor_telefon = ?, role = ? WHERE user.id = ?",
    [
      id,
      username,
      satker,
      tempat_lahir,
      tanggal_lahir,
      nomor_telefon,
      role,
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

//ubah profil
exports.ubahProfil = function (req, res) {
  var id = req.body.id;
  var username = req.body.username;
  var satker = req.body.satker;
  var tempat_lahir = req.body.tempat_lahir;
  var tanggal_lahir = req.body.tanggal_lahir;
  var nomor_telefon = req.body.nomor_telefon;
  connection.query(
    "UPDATE user SET id = ?, username = ?, satker = ?, tempat_lahir = ?, tanggal_lahir = ?, nomor_telefon = ? WHERE user.id = ?",
    [id, username, satker, tempat_lahir, tanggal_lahir, nomor_telefon, id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Mengubah Data!", res);
      }
    }
  );
};

exports.lupaPassword = function (req, res) {
  var id = req.body.id;
  var lupa_password = req.body.lupa_password;
  connection.query(
    "UPDATE user SET lupa_password = ? WHERE user.id = ?",
    [lupa_password, id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Mengubah Data!", res);
      }
    }
  );
};

exports.resetPassword = function (req, res) {
  var id = req.body.id;
  var lupa_password = req.body.lupa_password;
  var password = md5(req.body.password);
  connection.query(
    "UPDATE user SET lupa_password = ?, password = ? WHERE user.id = ?",
    [lupa_password, password, id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Mengubah Data!", res);
      }
    }
  );
};
