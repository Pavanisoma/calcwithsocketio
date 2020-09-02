const app=require("express")();
const http=require("http").Server(app);
const io = require("socket.io")(http);


io.on("connection", client => {
  client.on("subscribeToLogs", calculation => {
    console.log("client is subscribing to get logs of calculator");
    console.log(calculation);
    io.emit("calculation", calculation);
  });
  
});

const allowedOrigins = "*:*";

const port = Number(process.env.PORT) || 8000;
io.origins('*:*');
io.listen(port);
console.log("listening on port ", port);
