const { request } = require("express");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
// router
const HomeRouter = require("./routes/home");
const BookRouter = require("./routes/book");
const AuthRouter = require("./routes/auth");

app.use("/", HomeRouter);
app.use("/book", BookRouter);
app.use("/auth", AuthRouter);

app.listen(3001, () => {
  console.log("Running 3001");
});
