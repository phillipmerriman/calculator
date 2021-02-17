const express = require("express");
const mongoose = require("mongoose");
const mongojs = require("mongojs");
const apiRoutes = require("./routes/api-routes");
const htmlRoutes = require("./routes/html-routes");

const PORT = process.env.PORT || 3000;

const app = express();

// Parse the application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static content for the app from the "public" directory in the application directory
app.use(express.static("public"));

// Connect to the database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/calculator", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// const databaseUrl = "calculator";
// const collections = ["calculations"];

// const db = mongojs(databaseUrl, collections);
// db.on("error", error => {
//   console.log("Database Error:", error);
// });



// Calculation.insertMany(defaultCalcs, (err, data) => {
//   err ? console.log(err) : console.log("Yayyy! DefaultCalcs was added to DB!", data);
// });

// Routes
// =============================================================
// go into db
app.use("/api/", apiRoutes);

app.use("/", htmlRoutes);

// require("./routes/api-routes")(app);
// require("./routes/html-routes")(app);

//save calculation to the database
// app.post("/submit", (req, res) => {
//     console.log("/submit clicked!!!!", req.body);
//     db.calculations.insert(req.body, (err, data) => {
//         err ? res.send(err) : res.json(data);
//     });
//   });

//get calculations and populate 
// app.get("/", (req, res) => {
//     Calculation.find({}, (err, data) => {
//         err ? res.send(err) : res.json(data);
//     });
// });

// Start our server so that it can begin listening to client requests
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
