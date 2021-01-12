// This imports the orm.js into this burger.js
var orm = require("../config/orm.js");

// This will call the ORM functions
var burger = {
    // This displays all the burgers in the data base
    selectAll: function(cb) {
        orm.selectAll("burgers", function(res) {
            cd(res);
        });
    },

    // This adds a new burger to the database
    insertOne: function(cols, vals, cd) {
        orm.insertOne("burgers", cols, vals, function(res) {
            cd(res);
        });
    },

    // This changes/updates the devoured status
    updateOne: function(objColVals, condition, cb) {
        orm.updateOne("burgers", objColVals, condition, function(res) {
            cb(res);
        });
    },
    // This deletes a burger from the data base
    deleteOne: function(condition, cb) {
        orm.deleteOne("burgers", condition, function(res) {
            cb(res);
        });
    }
};

// This exports the functions for the database for the controller
module.exports = burger;
