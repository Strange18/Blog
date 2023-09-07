// this file contains the simple schema for the table named Post
const mongoose = require('mongoose')


const Schema = mongoose.Schema;


// creating instance of mongoose.Schema
// defing the schema
const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Post', PostSchema)