const express = require("express");
const app = express();
const server = app.listen(8080, function(){
    console.log("Listening on 8080");
});
const io = require('socket.io')(server);
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.get("/", (request, response) => {
    response.render("index");
});

let current_color = "white";
let previous_color = "white";

io.on('connection', (socket) => {
    console.log("Socket ID: ", socket.id);

    socket.on("change_color", function(data){
        previous_color = current_color;
        current_color = data.color;
        io.emit("set_color", {color: current_color});
    });

    socket.emit("set_prev_color", {color: previous_color});
});
