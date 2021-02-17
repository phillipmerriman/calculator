const express = require("express");
const router = express.Router();
const db = require("../models/calcSchema.js");

// GET Route
router.get("/", (req, res) => {
  db.find({}, (err, data) => {
    err ? res.send(err) : res.json(data);
  });
});

// POST Route
router.post("/submit", (req, res) => {
  db.create(req.body, (err, data) => {
    err ? res.send(err) : res.send(data);
  });
});

module.exports = router;
