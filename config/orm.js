// This requires the connection.js
var connection = require("../config/connection.js");

// This is the helper function for SQL syntax
function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

// This is the helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
    // This loops through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // This checks to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // example {devoured: true} => ["devoured=true"]
            arr.push(key + "=" + value);
        }
    }
    // This translates an array of strings to a single comma-separated string
    return arr.toString();
}

// This starts the Orm functions
var orm = {
    // This display all burgers in the data base.
    selectAll: function(table, cb) {
        var queryString = "SELECT * FROM " + table + ";";

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    // This adds a burger to the data base. It is an ORM method that inserts a new row into the table
    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err
            }
            cb(result);
        });
    },
    // This sets the burger devoured status to true. It is an ORM method that updates the Boolean devoured in the table
    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err
            }
            cb(result);
        });
    },
    // This deletes a burger from the data base. It is an ORM method that that deletes a row from the table
    deleteOne: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err
            }
            cb(result);
        });
    }
};

// This export the ORM object for the model in burger.js
module.exports = orm;