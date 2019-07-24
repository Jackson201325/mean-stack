// will hold the express app
const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('Hello from the MiddleWare')
  next()
})
app.use((req, res, next) => {
  res.send('Hello From Express')
})

module.exports = app
