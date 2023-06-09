const db = require("../common/connet");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.email = user.email;
};

User.register = function (data, result) {
  db.query(
    "SELECT * FROM jdbc_demo.user WHERE username = ?",
    [data.username],
    (err, user) => {
      if (err) {
        result(null);
      }
      if (user.length > 0) {
        result({ message: "Tài khoản đã tồn tại" });
      } else {
        db.query(
          "INSERT INTO jdbc_demo.user SET ?",
          data,
          function (err, user) {
            if (err) {
              result(null);
            } else {
              result({ id: user.insertId, ...data });
            }
          }
        );
      }
    }
  );
};

User.login = function (data, result) {
  if (!data.username || !data.password) {
    result({ message: "Vui lòng điền đủ thông tin" });
  } else {
    db.query(
      "SELECT * FROM jdbc_demo.user WHERE username = ?",
      [data.username],
      (err, response) => {
        console.log(response);
        if (err) {
          throw err;
        }
        if (!response[0] || data.password !== response[0].password) {
          result({ message: "Sai tài khoản hoặc mật khẩu" });
        } else {
          // const token = jwt.sign({ id: response[0].id }, "PRIVATE_KEY", {
          //   expiresIn: "20d",
          // });
          // result({ user: data, token: token });
          result({ user: response[0] });
        }
      }
    );
  }
};

module.exports = User;
