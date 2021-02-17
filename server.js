const express = require("express");
const mongoose = require("mongoose");
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
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/calculator", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Routes
// =============================================================
app.use("/api/", apiRoutes);
app.use("/", htmlRoutes);

// Start our server so that it can begin listening to client requests
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
