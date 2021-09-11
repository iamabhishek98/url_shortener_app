const mongoose = require("mongoose");
require("dotenv").config();

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || "27017";
const DB_NAME = process.env.NODE_ENV === "test" ? "test_url" : "url";

const dbConnect = async () => {
  try {
    await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
      useNewUrlParser: true,
    });

    console.log("Database connected...");
  } catch (err) {
    console.log("error:", err);
  }
};

module.exports = dbConnect;
