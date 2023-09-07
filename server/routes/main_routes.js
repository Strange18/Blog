//this file contains the routes
const express = require('express');
const router = express.Router();

// for the schema 
const post = require('../model/post');

//render function helps in sending the html file
const { render } = require('express/lib/response');


// a simple route or home page that fetches data from the databases
router.get('', async (req, res) => {
    try {
        const data = await post.find();
        res.render('index', { data });


    } catch (error) {
        console.log("Error Occoured!")
    }

})

//route to view each individual pages
router.get('/post/', async (req, res) => {
    try {
        const data = await post.findById()
        render('', data)
    } catch (error) {
        console.log('error occoured!')
    }

})


// route to go to about page
router.get('/about', (req, res) => {

    //renders the content of about present in views
    res.render('about');
})

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