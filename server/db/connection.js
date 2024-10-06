require("dotenv").config();
const mongoose = require("mongoose");

// Replace 'process.env.Atlas_URI' with your actual environment variable name for MongoDB URI
const mongoURI = process.env.Atlas_URI;

const conn = mongoose
  .connect(mongoURI)
  .then((db) => {
    console.log("Database Connected");
    return db; // Optionally, return the database connection object for exporting if needed
  })
  .catch((err) => {
    console.error("Connection Error:", err.message);
    // Exit process on connection failure or handle retries
    // process.exit(1); // Exit with failure
  });

module.exports = conn;
