// These require the dependencies
var express = require("express");
var bodyParser = require("body-parser")

// These are the variables for the server and express
var app = express();
var PORT = process.env.PORT || 8080;

// This serves the static content from the public directory
app.use(express.static("public"));

//This parses application/urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//This parses application/json
app.use(bodyParser.json());

// This sets up the Express Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// This imports the routes and allows the server to access them
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});