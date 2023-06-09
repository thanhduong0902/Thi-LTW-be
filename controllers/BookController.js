const Book = require("../models/BookModel");

exports.getList = function (req, res) {
  Book.getAll(function (data) {
    res.json({ results: data });
  });
};

exports.getDetail = function (req, res) {
  Book.getDetail(req.params.id, function (response) {
    res.json({ results: response });
  });
};

exports.getBuy = function (req, res) {
  console.log(req.params);
  Book.getBuy(req.params.userId, function (response) {
    res.json({ results: response });
  });
};

exports.addBook = function (req, res) {
  const data = req.body;
  Book.create(data, function (response) {
    res.json({ results: response });
  });
};

exports.upload = function (req, res) {
  const data = req.file;
};

exports.deleteBook = function (req, res) {
  Book.delete(req.params.id, function (response) {
    res.json({ results: response });
  });
};

exports.updateBook = function (req, res) {
  const data = req.body;

  Book.update(data, function (response) {
    res.json({ results: response });
  });
};

exports.soldBook = function (req, res) {
  const data = req.body;
  Book.sold(data, function (response) {
    res.json({ results: response });
  });
};

exports.backBook = function (req, res) {
  const data = req.body;
  Book.back(data, function (response) {
    res.json({ results: response });
  });
};

exports.getComments = function (req, res) {
  Book.getComments(req.params.id, function (response) {
    res.json({ results: response });
  });
};

exports.addComment = function (req, res) {
  const data = req.body;
  Book.addComments(data, function (response) {
    res.json({ results: response });
  });
};
