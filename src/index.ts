import express from "express";
import dotenv from "dotenv";
import { router as userRouter } from "./routes/users";
import { router as recipeRouter } from "./routes/recipes";
import { router as storageRouter } from "./routes/storage";
import { dbConnect } from "./dbConnect";
import authMiddleware from "./middleware/auth";

dotenv.config();
dbConnect();
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use("/api", authMiddleware, userRouter);
app.use("/api", authMiddleware, recipeRouter);
app.use("/api", authMiddleware, storageRouter);

app.listen(port, () => {
  console.log(`🚀 server started at http://localhost:${port}`);
});
