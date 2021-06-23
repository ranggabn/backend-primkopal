var connection = require("../koneksi");
var mysql = require("mysql");
var md5 = require("MD5");
var response = require("../res");
var jwt = require("jsonwebtoken");
var config = require("../config/secret");
var ip = require("ip");

//controller untuk register
exports.reqistrasi = function (req, res) {
  var post = {
    username: req.body.username,
    id: req.body.id,
    password: md5(req.body.password),    
    role: 3,
    satker: req.body.satker,
    nomor_telefon: req.body.nomor_telefon,
    tempat_lahir: req.body.tempat_lahir,
    tanggal_lahir: req.body.tanggal_lahir,
    bukti_transfer: req.body.bukti_transfer,
    tanggal_daftar: new Date(),
  };

  var query = "SELECT id FROM ?? WHERE ??=?";
  var table = ["user", "id", post.id];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 0) {
        var query = "INSERT INTO ?? SET ?";
        var table = ["user"];
        query = mysql.format(query, table);
        connection.query(query, post, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            response.ok("Pendaftaran Berhasil!", res);
          }
        });
      } else {
        response.ok("NIP / NRP anda sudah terdaftar!", res);
      }
    }
  });
};

//controller login
exports.login = function(req, res){
    var post = {
        password: req.body.password,
        id: req.body.id,
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table =["user", "password", md5(post.password), "id", post.id];

    query = mysql.format(query, table);
    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 1){
                var token = jwt.sign({rows}, config.secret, {
                    expiresIn: '30000'
                });
                id_user = rows[0].id;
                username = rows[0].username;
                role = rows[0].role;
                id = rows[0].id
                satker = rows[0].satker
                nomor_telefon = rows[0].nomor_telefon
                tempat_lahir = rows[0].tempat_lahir
                tanggal_lahir = rows[0].tanggal_lahir

                var expired = 30000

                var data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                }

                var query = "INSERT INTO ?? SET ?";
                var table =["akses_token"]

                query = mysql.format(query, table);
                connection.query(query, data, function(error, rows){
                    if(error){
                        console.log(error);
                    }else{
                         res.json({
                             success: true,
                             message: "Token JWT tergenerate",
                             token: token,
                             expires: expired,
                             currUser: data.id_user,
                             user: username,
                             id: id,
                             role: role,
                             satker: satker,
                             nomor_telefon: nomor_telefon,
                             tempat_lahir: tempat_lahir,
                             tanggal_lahir: tanggal_lahir
                         });
                    }
                });
            }else{
                 res.json({"Error" : true, "Message":"NIP / NRP atau password anda salah"});
            }
        }
    })
}

exports.halamanrahasia = function(req,res){
    response.ok("halaman ini hanya untuk user dengan role 2", res);
}

// exports.adminmahasiswa = function (req, res) {
//   connection.query("SELECT * FROM mahasiswa", function (error, rows, fields) {
//     if (error) {
//       console.log(error);
//     } else {
//       response.ok(rows, res);
//     }
//   });
// };
