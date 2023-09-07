//this file contains the routes
const express = require("express");
const router = express.Router();

// for the schema
const post = require("../model/post");

//render function helps in sending the html file
const { render } = require("express/lib/response");

// a simple route or home page that fetches data from the databases
router.get("", async (req, res) => {
  try {
    const data = await post.find();
    res.render("index", { data });
  } catch (error) {
    console.log("Error Occoured!");
  }
});

//route to view each individual pages
router.get("/post/:id", async (req, res) => {
  try {
    let post_id = req.params.id;
    const data = await post.findById({ _id: post_id });
    res.render("post", { data });
  } catch (error) {
    console.log(`error occoured in post! ${error}`);
  }
});

// route to go to about page
router.get("/about", (req, res) => {
  //renders the content of about present in views
  res.render("about");
});

// route for search function

// for get request -> req.params.<keyword>
// for post request -> req.body.<keyword/ name in HTML>

router.post("/search", async (req, res) => {
  try {
    let searched_query = req.body.query;
    const searchSpecialCharacter = searched_query.replace(/[^a-zA=Z0-9]/g, "");
    // console.log(searched_query);
    const data = await post.find({
      $or: [
        { title: { $regex: new RegExp(searchSpecialCharacter, "i") } },
        { body: { $regex: new RegExp(searchSpecialCharacter, "i") } },
      ],
    });
    res.render("search", { data, searched_query });
    // res.send(searched_query);
  } catch (error) {}
});

module.exports = router;

// function insertData() {
//     post.insertMany([
//         {
//             title: 'This is my first post.',
//             body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Est distinctio atque ratione nesciunt, dolores vero error repudiandae assumenda, nam ullam soluta possimus! Vitae nesciunt accusantium ullam earum ipsam, eveniet quo laudantium dicta asperiores magnam commodi doloribus nulla nam? Amet nobis provident ratione natus maiores dicta neque.Itaque dolores mollitia saepe.',
//             active: true,
//         }
//     ])
// }

// insertData();
