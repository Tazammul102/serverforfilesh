const mongoose = require("mongoose");
const connectToMongodb = () => {
  mongoose.connect(process.env.DB, () => {
    try {
      console.log("Connected to MongoDB SuccessFully");
    } catch (error) {
      console.error("Error : Connection Failed");
    }
  });
};
module.exports = connectToMongodb;
