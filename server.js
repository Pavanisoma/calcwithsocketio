//const app=require("express")();
var express = require('express');
const app=express();
const http=require("http").Server(app);
const io = require("socket.io")(http);
const path = require('path');

  // Serve any static files
  app.use(express.static(path.join(__dirname, '../build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname+ '/build/index.html'));
  });

io.on("connection", client => {
  client.on("subscribeToLogs", calculation => {
    console.log("client is subscribing to get logs of calculator");
    console.log(calculation);
    io.emit("calculation", calculation);
  });
  
});

const allowedOrigins = "*:*";;

const port = Number(process.env.PORT) || 8000;
io.origins('*:*');
// http.listen(port, '0.0.0.0', function () {
//   console.log('listening');
// });

io.listen(port);
console.log("listening on port ", port);
