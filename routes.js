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

  app.route("/tambahSimpanan").post(jsonku.tambahSimpanan);

  app.route("/hapusSimpanan").delete(jsonku.hapusSimpanan);

  app.route("/ubahSimpanan").put(jsonku.ubahSimpanan);

  /*=================KREDIT==============*/
  app.route("/tambahKredit").post(jsonku.tambahKredit);

  app.route("/tampilStatusKP").get(jsonku.tampilStatusKP);

  app.route("/tampilCicilan/:tipe_cicilan").get(jsonku.tampilCicilan);

  app.route("/tampilCicilan").get(jsonku.tampilAllCicilan);

  app.route("/tampilKredit").get(jsonku.tampilkredit);

  app.route("/hapusKredit").delete(jsonku.hapusKredit);

  /*=================MAHASISWA==============*/
  app.route("/tampil").get(jsonku.tampilsemuamahasiswa);

  app.route("/tampil/:id").get(jsonku.tampilbedasarkanid);

  app.route("/tambah").post(jsonku.tambahMahasiswa);

  app.route("/edit").put(jsonku.ubahMahasiswa);

  app.route("/hapus").delete(jsonku.hapusMahasiswa);

  app.route("/tampilmatakuliah").get(jsonku.tampilgroupmatakuliah);
};
