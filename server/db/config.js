const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/url", {
      useNewUrlParser: true,
    });

    console.log("Database connected...");
  } catch (err) {
    console.log("error:", err);
  }
};

module.exports = dbConnect;
