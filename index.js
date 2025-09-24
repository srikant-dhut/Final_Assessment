const express = require("express");
const dbCon = require("./app/config/dbConnetion");
const path = require("path");
const app = express();
const flash = require("connect-flash");
const session = require("express-session");
require("dotenv").config();

dbCon();

app.use(
  session({
    secret: "srikant",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.delete_msg = req.flash("delete_msg");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));

app.set("view engine", "ejs");
app.set("views", "views");

const customerRouter = require("./app/routers/customerRoute");
app.use(customerRouter);

const adminRouter = require("./app/routers/adminRouter");
app.use("/admin", adminRouter);


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on that http://localhost:${port}`);
});
