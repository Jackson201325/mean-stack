// will hold t
const express = require('express');
const bodyParse = require('body-parser')
const Post = require('./models/post')
const mongoose = require('mongoose')
const app = express();


mongoose.connect('mongodb+srv://jack:K88LaUq4S4ckT9UB@cluster0-wb8be.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(()=> {
    console.log('Server has connected')
  })
  .catch(error => {
    console.log('This is error', error)
  })

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
  post.save().then(result => {
    res.status(201).json({
      message: 'New post was added',
      postId: result._id
    })  
  })
 
})

app.get("/api/posts",(req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      "message": "Posts fetched successfully",
      "posts": documents
    })
  }) 
})

app.delete("/api/posts/:id", (req, res, next) => {
  console.log(req.params.id)
  Post.deleteOne({ 
    _id: req.params.id
  }).then(result => {
    console.log(result)
    res.status(200).json({
      "message": "Goodbye"
    })
  });
  
})
// password
// K88LaUq4S4ckT9UB

module.exports = app
