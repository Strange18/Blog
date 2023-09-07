// this file contains the simple schema for the table named Post
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// creating instance of mongoose.Schema
// defing the schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
