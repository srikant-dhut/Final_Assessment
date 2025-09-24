const mongoose = require("mongoose");

const dbCon = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Db connection successfull");
  } catch (error) {
    console.log("mongodb error", error);
  }
};

module.exports = dbCon;
