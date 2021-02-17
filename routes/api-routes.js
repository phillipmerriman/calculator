const express = require("express");
const router = express.Router();
const db = require("../models/calcSchema.js");

router.get("/", (req, res) => {
  db.find({}, (err, data) => {
    err ? res.send(err) : res.json(data);
  });
});

// Export all the routes in one function
// module.exports = function (app) {
//   //save calculation to the database
  router.post("/submit", (req, res) => {
    db.create(req.body, (err, data) => {
      err ? res.send(err) : res.send(data);
    });
  });

//   //get calculations and populate
//   app.get("/", (req, res) => {
//     Calculation.find({}, (err, data) => {
//       err ? res.send(err) : res.json(data);
//     });
//   });

//   // Get calculations
//   // app.get("/api/workouts", (req, res) => {
//   //   Workout.find({})
//   //     .then((data) => {
//   //       res.json(data);
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //       res.json(404);
//   //     });
//   // });
// };

module.exports = router;
