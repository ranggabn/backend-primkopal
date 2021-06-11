"use strict";

module.exports = function (app) {
  var jsonku = require("./controller");

  app.route("/").get(jsonku.index);

  app.route("/tambahBarang").post(jsonku.tambahBarang);

  app.route("/tampilBarang").get(jsonku.tampilBarang);

  app.route("/tampilBarang/:id").get(jsonku.tampilbarangid);

  app.route("/tampilStatus").get(jsonku.tampilStatus);

  app.route("/tampilKategori").get(jsonku.tampilKategori);

  app.route("/hapusBarang").delete(jsonku.hapusBarang);

  app.route('/ubahBarang').put(jsonku.ubahBarang);

  app.route("/tampil").get(jsonku.tampilsemuamahasiswa);

  app.route("/tampil/:id").get(jsonku.tampilbedasarkanid);

  app.route("/tambah").post(jsonku.tambahMahasiswa);

  app.route("/edit").put(jsonku.ubahMahasiswa);

  app.route("/hapus").delete(jsonku.hapusMahasiswa);

  app.route("/tampilmatakuliah").get(jsonku.tampilgroupmatakuliah);
};
