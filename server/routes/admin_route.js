const express = require("express");
const router = express.Router();
const post = require("../model/post");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const admin_layout = "../views/layouts/admin";

const jwtsecret = process.env.JWT_SECRET;

const authMiddleware = require("../middlewares/token_verify");

const insertData = require("../model/insert_post_data");

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
    let { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const jwttoken = jwt.sign({ userID: user._id }, jwtsecret);

    res.cookie("token", jwttoken, { httpOnly: true });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(`Error occoured ${error}`);
  }
});

router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const data = await post.find();
    res.render("admin/dashbaord", { layout: admin_layout, data });
  } catch (error) {
    console.log(`Error occoured ${error}`);
  }
});

router.get("/add-post", authMiddleware, async (req, res) => {
  try {
    res.render("admin/add-post", { layout: admin_layout });
  } catch (error) {
    console.log(`Error occoured ${error}`);
  }
});

router.post("/add-post", authMiddleware, async (req, res) => {
  try {
    let { title, body } = req.body;
    try {
      const data = await insertData(title, body);
      res.render("admin/add-post", { layout: admin_layout });
    } catch (error) {
      console.log(`Error occoured ${error}`);
    }
  } catch (error) {
    console.log(`Error occoured ${error}`);
  }
});

router.delete("/delete-post/:id", authMiddleware, async (req, res) => {
  try {
    let id = req.params.id;
    try {
      const data = await post.findById({ _id: id }).deleteOne();
      res.redirect("/dashboard");
    } catch (error) {
      console.log(`Error occoured ${error}`);
    }
  } catch (error) {
    console.log(`Error occoured ${error}`);
  }
});

router.get("/edit-post/:id", authMiddleware, async (req, res) => {
  try {
    let id = req.params.id;
    try {
      const data = await post.findOne({ _id: id });
      res.render("admin/edit-post", { layout: admin_layout, data });
    } catch (error) {
      console.log(`Error occoured ${error}`);
    }
  } catch (error) {
    console.log(`Error occoured ${error}`);
  }
});

router.put("/edit-post/:id", authMiddleware, async (req, res) => {
  try {
    let id = req.params.id;
    try {
      const data = await post.findByIdAndUpdate(id, {
        title: req.body.title,
        body: req.body.body,
        updatedAt: Date.now(),
      });
      // res.render("admin/edit-post", { layout: admin_layout }, data);
      res.redirect(`/edit-post/${req.params.id}`);
    } catch (error) {
      console.log(`Error occoured ${error}`);
    }
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

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout Successful" });
  res.redirect('/')
});
module.exports = router;
