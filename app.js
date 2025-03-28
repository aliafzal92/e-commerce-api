// Environment and async error handling
import "dotenv/config";
import "express-async-errors";
import cookieParser from "cookie-parser";

// Express and middleware
import express from "express";
import morgan from "morgan";

// Database connection
import connectDB from "./db/connect.js";

// Routes
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

// Custom middlewares
import notFoundMiddleware from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to the database successfully");

    app.listen(port, () => {
      console.log(
        `Server is running on port ${port} at http://localhost:${port}`
      );
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

start();
