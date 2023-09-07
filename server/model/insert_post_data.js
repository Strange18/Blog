const post = require("./post");

function insertData(heading, data) {
  post.create([
    {
      title: heading,
      body: data,
      active: true,
    },
  ]);
}

module.exports = insertData;
