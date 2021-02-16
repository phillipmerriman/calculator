const express = require("express");
const db = require("mongojs");

// Export all the routes in one function
module.exports = function (app) {
  //save calculation to the database
  app.post("/submit", (req, res) => {
    console.log("/submit clicked!!!!", req.body);
    db.calculations.insert(req.body, (err, data) => {
        err ? res.send(err) : res.send(data);
    });
  });

  // Get calculations
  app.get("/api/workouts", (req, res) => {
    Workout.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json(404);
      });
  });
};
