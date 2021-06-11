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
    function (error, rows, fields)  {
      if (error) {
        console.log(error);
      }else{
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
  connection.query("SELECT barang.id_barang, barang.nama, barang.harga, barang.keterangan, status.status_barang, kategori.kategori_barang FROM barang JOIN kategori JOIN status WHERE barang.id_kategori = kategori.id AND barang.id_status = status.id_status ORDER BY barang.id_barang", function (error, rows, field) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
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
  connection.query("SELECT simpan.id_simpanan, simpan.id_user, simpan.jumlah_simpanan, simpan.terbilang, simpan.tanggal_simpan, user.id, user.username FROM simpan JOIN user WHERE simpan.id_user = user.id ORDER BY simpan.id_simpanan", function (error, rows, field) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
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