let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let cors = require("cors");
let db = require("./config/db");
let backup = require("./config/backup");

const indexRouter = require("./routes/index");
const usuRouter = require("./routes/usuario.route");
const empRouter = require("./routes/empresa.route");
const msgRouter = require("./routes/mensaje.route");
const pedRouter = require("./routes/pedido.route");
const repRouter = require("./routes/repartidor.route");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Comunicación entre apliaciones
app.use(cors());

//Conexión con Mongo
db.mongoConnect();

// BackUp de Base de datos
backup.start();

app.use("/", indexRouter);
app.use("/usu", usuRouter);
app.use("/emp", empRouter);
app.use("/msg", msgRouter);
app.use("/ped", pedRouter);
app.use("/rep", repRouter);

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

module.exports = app;
