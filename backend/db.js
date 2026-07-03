const mongoose = require("mongoose");

const connectDatabase = () => {
  const mongoUri = process.env.DB_URL || process.env.DB_LOCAL_URI;

  if (!mongoUri) {
    throw new Error("MongoDB connection string is not defined");
  }

  mongoose
    .connect(mongoUri, {
    })
    .then((con) => {
      console.log(
        `MongoDB Database connected with HOST:${con.connection.host}`
      );
    });
};
module.exports = connectDatabase;
