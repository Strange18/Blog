// to load environment variables from .env file
require("dotenv").config();

// for express server
const express = require("express");

//for creating a single layout and placing all components over it
const expressLayout = require("express-ejs-layouts");

const cookieParser = require("cookie-parser");

const MongoStore = require("connect-mongo");

const session = require("express-session");

const app = express();
const port = 5000;

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

//for storing css js image files
app.use(express.static("public"));

//Templating Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// connecting the database
const connectdb = require("./server/config/db");
const { cookie } = require("express/lib/response");

connectdb();

app.use("/", require("./server/routes/main_routes.js"));
app.use("/", require("./server/routes/admin_route"));

// starting the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
