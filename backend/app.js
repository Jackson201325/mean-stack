const express = require("express");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const postsRoutes = require("./routes/posts"); 


mongoose
  .connect(
    "mongodb+srv://jack:K88LaUq4S4ckT9UB@cluster0-wb8be.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Server has connected");
  })
  .catch(error => {
    console.log("This is error", error);
  });

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Resquested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
