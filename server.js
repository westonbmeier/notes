var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// App configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static('public'));

// Need to set up routes //



// Listening Port //
app.listen(PORT, function () {
    console.log("Server is listening on PORT: " + PORT);
  });

// Need functions for DB //