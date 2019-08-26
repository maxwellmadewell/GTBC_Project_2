// Dependencies====================================================================================
var express = require("express");


// Sets up the Express App=========================================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory to be served
app.use(express.static("app/public"));


// Routes=========================================================================================
require("./app/routes/api-routes.js")(app);
require("./app/routes/html-routes.js")(app);


// Syncing our sequelize models and then starting our Express app=================================
db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});
