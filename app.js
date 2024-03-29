const cookieParser = require("cookie-parser");
const express = require("express");
const httpErrors = require("http-errors");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const db = require("./config/database");
const sequelizeStore = require("connect-session-sequelize");
const cors = require("cors");
const { secret_key } = require("./config/baseConfig");
// Service Route
const authRoute = require("./app/auth/router");
const orderRoute = require("./app/order/router");
const workOrderRoute = require("./app/workOrder/router");
const sparepartRoute = require("./app/sparepart/router");
const invoiceRoute = require("./app/invoice/router");
const userRoute = require("./app/user/router");
const engineerRoute = require("./app/engineer/router");
const adminRoute = require("./app/admin/router");

const app = express();

// (async () => {
//   await db.sync();
// })();

// Connect session to mysql
const sessionStore = sequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});
// Set Session
app.use(
  session({
    name: "kepo",
    secret: secret_key,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: "auto",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 1, // 1 Day
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

// Service
app.use("/api", authRoute);
app.use("/api", orderRoute);
app.use("/api", workOrderRoute);
app.use("/api", sparepartRoute);
app.use("/api", invoiceRoute);
app.use("/api", userRoute);
app.use("/api", engineerRoute);
app.use("/api", adminRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
