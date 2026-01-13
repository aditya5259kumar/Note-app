require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//requiring authRoutes from routes folder
const authRoutes = require("./routes/authRoutes");

const cors = require("cors");

// requiring connect_DB from configs folder
const connect_DB = require("./configs/db");

// using connect_DB from configs folder
(async () => {
  await connect_DB();
})();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
const port = process.env.PORT;

// handling cors policy issue
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  credentials: true,
};

// lets handle cors policy issue
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

//using authRoutes from routes folder
app.use("/api/user", authRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.get("/", (req, res) => {
  res.send("Hello World from Express!");
});

// Start the server
app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`);
});

module.exports = app;
