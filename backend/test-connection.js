
require("dotenv").config();
const mongoose = require("mongoose");

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
      serverSelectionTimeoutMS: 10000
    });

    console.log("Kết nối MongoDB thành công!");
    console.log("Database:", mongoose.connection.name);

    const count = await mongoose.connection.db
      .collection("employees")
      .countDocuments();

    console.log("Số nhân viên:", count);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Kết nối MongoDB thất bại!");
    console.error(error.message);
    process.exitCode = 1;
  }
}

testConnection();
