const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

// routes
const user = require("./routes/user");
const memo = require("./routes/memo");

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cookieParser());
// cors
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Database"))
  .catch((err) => {
    console.log(err, "err connecting to database");
  });

app.use(express.json());
// app.use('/api/users', authRoutes);
app.use("/api/users", user);
app.use("/api/newMemo", memo);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
