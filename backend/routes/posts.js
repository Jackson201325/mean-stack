const express = require("express");
const router = express.Router()
const Post = require("../models/post");

router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({
      message: "New post was added",
      postId: result._id
    });
  });
});

router.get("", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully",
      posts: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findOne({
    _id: req.params.id
  }).then(document => {
    if (document) {
      console.log(document);
      res.status(200).json(document);
    } else {
      res.status(404).json({message: "Post not found"});
    }
    
  });
});

router.put("/:id", (req, res, next) => {
  const post = new Post ({
    _id: req.body.id,
    content: req.body.content,
    title: req.body.title
  })
  Post.updateOne({_id:req.params.id}, post)
    .then(document => {
      console.log(document)
      res.status(201).json({
        message: "Post fetched successfully",
        post: document
      })
    })
});

router.delete("/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({
    _id: req.params.id
  }).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Goodbye"
    });
  });
});

module.exports = router;