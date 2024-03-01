import dotenv from "dotenv";

import app from "./app.js";
import connectDB from "./db/db.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Social server is running at port - ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB db connection failed !!", error);
  });
