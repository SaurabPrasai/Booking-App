import  "dotenv/config"
import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelRoute from "./routes/hotels.js";
import roomRoute from "./routes/rooms.js";
import userRoute from "./routes/users.js";
import cookieParser from "cookie-parser"


const app = express();



mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("MongoDb Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//  Middleware
app.use(express.json());
app.use(cookieParser())

//   routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);

app.use((err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMessage = err.message || "Something went wrong";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
