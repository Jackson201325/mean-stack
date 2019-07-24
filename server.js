const http = require('http')

var server = http.createServer((req, res)=> {
  res.end('This is my first response');
})

server.listen(process.env.PORT || 5000);