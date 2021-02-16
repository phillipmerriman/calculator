const path = require('path');
const express = require("express");

// export all routes in one function
module.exports = function (app) {
    // Get/render homepage
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });    
}
