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

  app.route("/ubahBarang2").put(jsonku.ubahBarang2);

  /*=================SIMPANAN==============*/
  app.route("/tampilSimpanan").get(jsonku.tampilSimpanan);

  app.route("/tampilSimpanan/:id").get(jsonku.tampilsimpananid);

  app.route("/tampilSimpananuser/:id_user").get(jsonku.tampilsimpananiduser);

  app.route("/tambahSimpanan").post(jsonku.tambahSimpanan);

  app.route("/tambahPenarikan").post(jsonku.tambahPenarikan);

  app.route("/hapusSimpanan").delete(jsonku.hapusSimpanan);

  app.route("/ubahSimpanan").put(jsonku.ubahSimpanan);

  app.route("/totalSaldo/:id_user").get(jsonku.totalSaldo);

  app.route("/totalPenarikan/:id_user").get(jsonku.totalPenarikan);

  /*=================KREDIT==============*/
  app.route("/tambahKredit").post(jsonku.tambahKredit);

  app.route("/tampilCicilan/:tipe_cicilan").get(jsonku.tampilCicilan);

  app.route("/tampilCicilan").get(jsonku.tampilAllCicilan);

  app.route("/tampilCicilan2").get(jsonku.tampilCicilan2);

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

  app.route("/tampilbarangIdKategori/:id").get(jsonku.tampilbarangidkategori);

  app.route("/tambahKeranjang").post(jsonku.tambahKeranjang);

  app.route("/tampilKeranjang/:id_user").get(jsonku.tampilKeranjangId);

  app.route("/tampilKeranjangUser/:id_user").get(jsonku.tampilKeranjangIdUser);

  app
    .route("/tampilKeranjangBarang/:id_barang")
    .get(jsonku.tampilKeranjangIdBarang);

  app.route("/ubahKeranjang").put(jsonku.ubahKeranjang);

  app.route("/totalHarga/:id_user").get(jsonku.totalHarga);

  app.route("/hapusKeranjangId").delete(jsonku.hapusKeranjangId);

  app.route("/hapusKeranjangIdUser").delete(jsonku.hapusKeranjangIdUser);

  /*================PENJUALAN=============*/

  app.route("/tampilJual").get(jsonku.tampilPenjualan);

  app.route("/tampilPenjualan/:id").get(jsonku.tampilPenjualanid);

  app.route("/tampilPengambilan").get(jsonku.tampilPengambilan);

  app
    .route("/tampilPengambilan/:id_pengambilan")
    .get(jsonku.tampilPengambilanID);

  app.route("/tambahJual").post(jsonku.tambahPenjualan);

  app.route("/tambahPengambilan").post(jsonku.tambahPengambilan);

  app.route("/hapusJual").delete(jsonku.hapusPenjualan);

  app.route("/ubahPenjualan").put(jsonku.ubahPenjualan);

  app.route("/hapusPengambilan").delete(jsonku.hapusPengambilan);

  /*=================USER==============*/
  app.route("/tampil").get(jsonku.tampilUser);

  app.route("/tambahAnggota").post(jsonku.tambahAnggota);

  app.route("/tampilRole").get(jsonku.tampilRole);

  app.route("/tampil/:id").get(jsonku.tampilUserId);

  app.route("/tampilpassword/:id").get(jsonku.tampilpassword);

  app.route("/ubah").put(jsonku.ubahAnggota);

  app.route("/ubahProfil").put(jsonku.ubahProfil);

  app.route("/lupaPassword").put(jsonku.lupaPassword);

  app.route("/resetPassword").put(jsonku.resetPassword);

  app.route("/hapus").delete(jsonku.hapusUser);

  /*=================Komplain==============*/
  app.route("/tampilKomplain").get(jsonku.tampilKomplain);

  app.route("/tambahKomplain").post(jsonku.tambahKomplain);
};
