require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectMongoose } = require("./connection");
const authRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { connect } = require("mongoose");
const app = express();
const PORT = 8000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // if you're using cookies or sessions
  })
);
// third party and built in middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
connectMongoose(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err.error));

// routes
app.use("/api/auth", authRoute);
app.use("/api", blogRoute);

// connect to the PORT
app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
