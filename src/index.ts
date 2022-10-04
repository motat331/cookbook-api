import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { dbConnect } from "./dbConnect";
dbConnect();
import { router as userRouter } from "./routes/users";
import { router as recipeRouter } from "./routes/recipes";
import { router as storageRouter } from "./routes/storage";
import authMiddleware from "./middleware/auth";

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use("/api", authMiddleware, userRouter);
app.use("/api", authMiddleware, recipeRouter);
app.use("/api", authMiddleware, storageRouter);

app.listen(port || 5000, () => {
  console.log(`🚀 server started at http://localhost:${port}`);
});

export { app };
