const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./env" });
const port = process.env.PORT || 5500;

// Use middlewares
app.use(cors());
app.use(express.json());
app.use(require("./routes/route"));
//mongodb connection
const conn = require("./db/connection.js");

// Use routes
conn
  .then((db) => {
    if (!db) return process.exit(1);

    //listen to http server
    app.listen(port, () => {
      console.log(`Server is running on port:${port}`);
    });

    app.on("error", (err) =>
      console.log(`Failed to connect with HTTP server:${err}`)
    );
    // error in mongodb error
  })
  .catch((error) => {
    console.log(`Connection failed....!${error}`);
  });
