// Environment and async error handling
import "dotenv/config";
import "express-async-errors";

// Core modules
import path from "path";
import { fileURLToPath } from "url";

// Express and middleware
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

// Database connection
import connectDB from "./db/connect.js";

// Routers
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import reviewRouter from "./routes/review.routes.js";
 
// Custom middlewares
import notFoundMiddleware from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
 
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(path.join(__dirname));


// Middleware setup
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static(path.join(__dirname, "./public")));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);

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
