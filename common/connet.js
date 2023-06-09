const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "td09022002",
  database: "jdbc_demo",
});

connection.connect(function (err, connection) {
  if (err) console.log("Ket noi that bai");
  else console.log("Thanh cong");
});

module.exports = connection;
