// This requires the Express dependency
var express = require("express");

// This imports the model to use its data base functions for burger.js
var burger = require("../models/burger.js");

// This creates the router and export it at the end of the file
var router = express.Router();

// This creates routes and set up the logic where required
router.get("/", function (req, res) {
    burger.selectAll(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});
// This adds a new burger to the database
router.post("/api/burgers", function (req, res) {
    burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result) {
        // This sends back the ID of the new burger
        res.json({ id: result.insertId });
    });
});
// This sets the burger's devoured status to true.
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({ devoured: req.body.devoured }, condition, function(result) {
        if (result.changedRows === 0) {
            // This shows a 404 error if no row was changed
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
// This deletes a burger from database.
router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.deleteOne(condition, function(result) {
        if (result.changedRows === 0) {
            // This shows a 404 error if no row was changed
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// This exports the routes for the server.js to use
module.exports = router;