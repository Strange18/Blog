const express = require('express');
const router = express.Router();
const post = require('../model/post');
const { render } = require('express/lib/response');

router.get('', async (req, res) => {
    try {
        const data = await post.find();
        res.render('index', { data });


    } catch (error) {
        console.log("Error Occoured!")
    }

})

router.get('/post/', async (req, res) => {
    try {
        const data = await post.findById()
        render('', data)
    } catch (error) {
        console.log('error occoured!')
    }

})

router.get('/about', (req, res) => {

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