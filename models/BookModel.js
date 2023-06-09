const db = require("../common/connet");

const Book = function (book) {
  this.id = book.id;
  this.title = book.title;
  this.author = book.author;
  this.description = book.description;
  this.date = book.date;
  this.type = book.type;
  this.img = book.img;
  this.soldNumber = book.soldNumber;
};

Book.getAll = function (result) {
  db.query("SELECT * FROM jdbc_demo.book", function (err, books) {
    if (err) {
      result(null);
    } else result(books);
  });
};

Book.getDetail = function (id, result) {
  db.query(
    "SELECT * FROM jdbc_demo.book WHERE id = ?",
    id,
    function (err, book) {
      if (err || book.length == 0) {
        result(null);
      } else result(book[0]);
    }
  );
};

Book.create = function (data, result) {
  db.query(
    "SELECT * FROM jdbc_demo.book WHERE title = ? and author =?",
    [data.title, data.author],
    function (err, book) {
      if (err) {
        result(null);
      }
      if (book.length > 0) {
        result({ message: "Sách đã tồn tại" });
      } else {
        db.query(
          "INSERT INTO jdbc_demo.book SET ?",
          data,
          function (err, response) {
            if (err) {
              result(null);
            } else {
              result({ id: response.insertId, ...data });
            }
          }
        );
      }
    }
  );
};

Book.delete = function (id, result) {
  db.query(
    "DELETE FROM jdbc_demo.comment_book WHERE book_id = ?",
    id,
    (err, response) => {
      if (err) {
        console.log(err);
        result(null);
      } else {
        db.query(
          "DELETE FROM jdbc_demo.user_book WHERE book_id=?",
          id,
          (err, response) => {
            if (err) {
              console.log(err);
              result(null);
            } else {
              db.query(
                "DELETE FROM jdbc_demo.book WHERE id =?",
                id,
                (err, response) => {
                  if (err) {
                    result(null);
                  } else result({ message: "Thành công rùi" });
                }
              );
            }
          }
        );
      }
    }
  );
};

Book.update = function (data, result) {
  db.query(
    "UPDATE jdbc_demo.book SET title=?,author=?,description=?,date=?,type=?,img=? WHERE id=?",
    [
      data.title,
      data.author,
      data.description,
      data.date,
      data.type,
      data.img,
      data.id,
    ],
    function (err, book) {
      if (err) {
        console.log(err);
        result(null);
      } else result(data);
    }
  );
};

Book.getBuy = function (id, result) {
  db.query(
    "SELECT book.id, book.title, book.author,book.description,book.date,book.pageNumber,book.type,book.img,book.soldNumber,user_book.quantity  FROM book JOIN user_book ON book.id = user_book.book_id WHERE user_book.user_id = ?",
    [id],
    (err, res) => {
      if (err) {
        result({ message: "Error" });
      } else {
        result(res);
      }
    }
  );
};

Book.sold = function (data, result) {
  const updateSoldNumberQuery = `UPDATE jdbc_demo.book SET soldNumber = soldNumber + ? WHERE id = ?`;
  db.query(
    updateSoldNumberQuery,
    [data.quantity, data.bookId],
    function (err, response) {
      if (err) {
        db.rollback(() => {
          result({ error: "Failed to update soldNumber" });
        });
      } else {
        const insertUserBookQuery = `INSERT INTO jdbc_demo.user_book (user_id, book_id,quantity) VALUES (?,?,?)`;
        db.query(
          insertUserBookQuery,
          [data.userId, data.bookId, data.quantity],
          function (err, results) {
            if (err) {
              console.log(err);
              db.rollback(() => {
                result({ error: "Failed to insert into user_book" });
              });
            } else {
              result({ message: "thanh cong" });
            }
          }
        );
      }
    }
  );
};
Book.back = function (data, result) {
  const updateSoldNumberQuery = `UPDATE jdbc_demo.book SET soldNumber = soldNumber - ? WHERE id = ?`;
  db.query(
    updateSoldNumberQuery,
    [data.quantity, data.bookId],
    function (err, response) {
      if (err) {
        db.rollback(() => {
          result({ error: "Failed to update soldNumber" });
        });
      } else {
        const deleteUserBookQuery = `DELETE FROM jdbc_demo.user_book WHERE user_id=? and book_id=?`;
        db.query(
          deleteUserBookQuery,
          [data.userId, data.bookId],
          function (err, results) {
            if (err) {
              db.rollback(() => {
                result({ error: "Failed to delete user_book" });
              });
            } else {
              result({ success: "Thanh cong" });
            }
          }
        );
      }
    }
  );
};

Book.getComments = function (id, result) {
  db.query(
    "SELECT * FROM jdbc_demo.comment_book WHERE book_id = ?",
    id,
    function (err, comments) {
      if (err) {
        result(null);
      } else result(comments);
    }
  );
};

Book.addComments = function (data, result) {
  db.query(
    "INSERT INTO jdbc_demo.comment_book SET ?",
    data,
    function (err, comment) {
      if (err) {
        result(null);
      } else {
        result({ id: comment.insertId, ...data });
      }
    }
  );
};
module.exports = Book;
