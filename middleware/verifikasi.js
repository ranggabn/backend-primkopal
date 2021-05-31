const jwt = require("jsonwebtoken");
const config = require("../config/secret");

function verifikasi() {
  return function (req, rest, next) {
    var role = req.body.role;
    //cek authorization header
    var tokenWithBarier = req.headers.authorization;
    if (tokenWithBarier) {
      var token = tokenWithBarier.split(" ")[1];
      //verifikasi
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          return rest
            .status(401)
            .send({ auth: false, message: "Token tidak terdaftar" });
        } else {
          if (role == 1) {
            req.auth = decoded;
            next();
          } else {
            return rest
              .status(401)
              .send({ auth: false, message: "Gagal mengotorisasi role anda" });
          }
        }
      });
    } else {
      return rest
        .status(401)
        .send({ auth: false, message: "Token tidak tersedia" });
    }
  };
}

module.exports = verifikasi;
