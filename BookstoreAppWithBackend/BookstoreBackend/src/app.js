import cors from "cors";
import express from "express";
import bookRoute from "./routes/bookRoute.js";
import userRoute from "./routes/userRoute.js";
import connectDB from "./database/database.js";
import { authentication } from "./middleware/auth.js";

const app = express();

connectDB()
  .then(() => console.log("MongoDB connected successfully (from app.js)"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000/",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type"],
  })
);
app.get("/", (request, response) => {
  return response
    .status(200)
    .send({ success: true, message: "you got this bro" });
});
app.use("/books", authentication, bookRoute);
app.use("/auth", userRoute);

export default app;
