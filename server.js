"use strict";

var http = require("http"),
	express = require("express"),
	socketIo = require("socket.io"),
	users = 0;

const app = express();
app.set("view engine", "jade");

app.use(express.static("./public"));


app.get("/", (request, response) => {

	response.end("Hello world");

});

app.get("/home",(request, response) => {

	response.render("index", {title: "title!", users: users});

});

const server = new http.Server(app);
const io = socketIo(server);

io.on("connection", socket => {
	console.log("Client connected!");
	users++;
	socket.on("chat:add", data => {
		console.log(data);
		io.emit("chat:added", data);
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected");
		users--;

	});

});

server.listen(3000, () => {

	console.log("server started");
	

});