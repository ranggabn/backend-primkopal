"use strict";

module.exports = function (app) {
  var jsonku = require("./controller");

  app.route("/").get(jsonku.index);

  /*=================BARANG==============*/
  app.route("/tambahBarang").post(jsonku.tambahBarang);

  app.route("/tampilBarang").get(jsonku.tampilBarang);

  app.route("/tampilBarang/:id").get(jsonku.tampilbarangid);

  app.route("/tampilStatus").get(jsonku.tampilStatus);

  app.route("/tampilKategori").get(jsonku.tampilKategori);

  app.route("/hapusBarang").delete(jsonku.hapusBarang);

  app.route("/ubahBarang").put(jsonku.ubahBarang);

  /*=================SIMPANAN==============*/
  app.route("/tampilSimpanan").get(jsonku.tampilSimpanan);

  app.route("/tampilSimpanan/:id").get(jsonku.tampilsimpananid);

  app.route("/tampilSimpananuser/:id_user").get(jsonku.tampilsimpananiduser);

  app.route("/tambahSimpanan").post(jsonku.tambahSimpanan);

  app.route("/hapusSimpanan").delete(jsonku.hapusSimpanan);

  app.route("/ubahSimpanan").put(jsonku.ubahSimpanan);

  /*=================KREDIT==============*/
  app.route("/tambahKredit").post(jsonku.tambahKredit);

  app.route("/tampilStatusKP").get(jsonku.tampilStatusKP);

  app.route("/tampilCicilan/:tipe_cicilan").get(jsonku.tampilCicilan);

  app.route("/tampilCicilan").get(jsonku.tampilAllCicilan);

  app.route("/tampilKredit").get(jsonku.tampilkredit);

  app.route("/tampilKredit/:id").get(jsonku.tampilkreditid);

  app.route("/tampilKreditUser/:id_user").get(jsonku.tampilkreditiduser);

  app.route("/hapusKredit").delete(jsonku.hapusKredit);

  app.route("/ubahKredit").put(jsonku.ubahKredit);

  /*=================PINJAMAN==============*/

  app.route("/tampilPeraturan").get(jsonku.tampilPeraturan);

  app.route("/tampilPinjaman").get(jsonku.tampilPinjaman);

  app.route("/tampilPinjaman/:id").get(jsonku.tampilpinjamanid);

  app.route("/tampilPinjamanUser/:id_user").get(jsonku.tampilpinjamaniduser);

  app.route("/tambahPinjaman").post(jsonku.tambahPinjaman);

  app.route("/hapusPinjaman").delete(jsonku.hapusPinjaman);

  app.route("/ubahPinjaman").put(jsonku.ubahPinjaman);

  /*=================TOKO==============*/
  app.route("/tampilKategori").get(jsonku.tampilKategori);

  app.route("/tampilbarangIdKategori/:id").get(jsonku.tampilbarangidkategori)

  app.route("/tambahKeranjang").post(jsonku.tambahKeranjang);

  app.route("/tampilKeranjang/:id_user").get(jsonku.tampilKeranjangId);

  app.route("/tampilKeranjangBarang/:id_barang").get(jsonku.tampilKeranjangIdBarang);

  app.route("/ubahKeranjang").put(jsonku.ubahKeranjang);

  app.route("/totalHarga/:id_user").get(jsonku.totalHarga);

  app.route("/hapusKeranjangId").delete(jsonku.hapusKeranjangId);

  app.route("/hapusKeranjangIdUser").delete(jsonku.hapusKeranjangIdUser);

  /*=================MAHASISWA==============*/
  app.route("/tampil").get(jsonku.tampilsemuamahasiswa);

  app.route("/tampil/:id").get(jsonku.tampilbedasarkanid);

  app.route("/tambah").post(jsonku.tambahMahasiswa);

  app.route("/edit").put(jsonku.ubahMahasiswa);

  app.route("/hapus").delete(jsonku.hapusMahasiswa);

  app.route("/tampilmatakuliah").get(jsonku.tampilgroupmatakuliah);
};
