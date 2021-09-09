const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const dbConnect = require("./db/config");
const server = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

try {
  dbConnect();

  server.use(cors());
  server.use(bodyParser.json());

  require("./routes/GET")({ server });
  require("./routes/POST")({ server });

  if (process.env.NODE_ENV !== "test") {
    server.listen(PORT);
    console.log(`Server running on port ${PORT}...`);
  }
} catch (err) {
  console.log("error:", err);
}

module.exports = server;
