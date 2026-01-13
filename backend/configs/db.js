const mongoose = require("mongoose");

const connect_DB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("Error connecting to Mongo DB", error);
  }
};

module.exports = connect_DB;
