const jwt = require("jsonwebtoken");
const _App = require("./_App");

let make = function (user) {
  return new Promise(function (resolve, reject) {
    jwt.sign(
      { data: user },
      _App.ACCESS_TOKEN,
      {
        algorithm: "HS256",
        expriesIn: _App.TOKEN_TIME_LIFE,
      },
      function (err, _token) {
        if (err) return reject(err);
        return resolve(_token);
      }
    );
  });
};

module.exports = {
  make,
};
