const express = require("express");
const router = express.Router();
const post = require("../model/post");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const admin_layout = "../views/layouts/admin";

router.get("/admin", (req, res) => {
  try {
    res.render("admin/index", { layout: admin_layout });
  } catch (error) {
    console.log(`Error occoured ${error}`);
  }
});

// to check the login of the user
router.post("/admin", async (req, res) => {
  try {
    // let username = req.body.username;
    // let password = req.body.password;

    let { username, password } = req.body;
    // console.log(req.body);

    // const sanitize_username = username.replace(/[^a-zA=Z0-9]/g, "");
    // const sanitize_password = password.replace(/[^a-zA=Z0-9]/g, "");

    // const data = await User.find({
    //   username: username,
    // });
    // res.render("admin/index", { layout: admin_layout });
  } catch (error) {
    console.log(`Error occoured ${error}`);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hasedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, password: hasedPassword });
      res.status(201).json({ message: "User Created", user });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({
          message: "User already exists",
        });
        res.status(500).json({
          message: "Internal server Error!",
        });
      }
    }
  } catch (error) {
    console.log(`error occoured ${error}`);
  }
});
module.exports = router;
