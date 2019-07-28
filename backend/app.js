// will hold the express app
const express = require('express');
const bodyParse = require('body-parser')
const Post = require('./models/post')

const app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended:false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers", 
    "Origin, X-Resquested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
})

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  console.log(post);
  res.status(201).json({
    message: 'New post was added',
    post: post
  })  
})

app.get("/api/posts",(req, res, next) => {
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
    "message": "Posts fetched successfully",
    "posts":posts
  })
})
// password
// K88LaUq4S4ckT9UB

module.exports = app
