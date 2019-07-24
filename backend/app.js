// will hold the express app
const express = require('express');

const app = express();

app.use("/api/posts",(req, res, next) => {
  const posts = [
    {
      id:"12345gfvaf",
      title:"First server-side post",
      content:"This is from the server"
    },
    {
      id:"j434hn3m434n",
      title:"Second server-side post",
      content:"This is from the server"
    }
  ]
  res.status(200).json({
    "message": "I have no idea what the fuck is this",
    "posts":posts
  })
})


module.exports = app
