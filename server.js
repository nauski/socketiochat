"use strict";

var http = require("http"),
	express = require("express");

const app = express();
app.set("view engine", "jade");

app.use(express.static("./public"));

app.use((request, response, next) => {
	console.log("in middleware 1");
	next();
	console.log("out of middleware 2");

});



app.get("/", (request, response) => {

	response.end("Hello world");

});

app.get("/home",(request, response) => {

	response.render("index", {title: "title!"});

});

const server = new http.Server(app);

server.listen(3000, () => {

	console.log("server started");

});