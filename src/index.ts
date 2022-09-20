import express from 'express';
import dotenv from 'dotenv';
import { router as userRouter } from './routes/users';
import { dbConnect } from './dbConnect';
import authMiddleware from './middleware/auth';

dotenv.config();
dbConnect();
const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use('/api', authMiddleware, userRouter);

app.listen(port, () => {
    console.log(`🚀 server started at http://localhost:${port}`);
});
