const User = require("../models/UserModel");
exports.register = function (req, res) {
  const data = req.body;
  User.register(data, function (response) {
    res.json({ results: response });
  });
};

exports.login = function (req, res) {
  const data = req.body;
  User.login(data, function (response) {
    res.json({ results: response });
  });
};
