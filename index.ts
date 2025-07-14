import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
/*
import rootRouter from "./route";
*/
import cors from 'cors'
import dotenv from "dotenv";
import rootRouter from "./route";
dotenv.config();


const app = express();
const PORT = 3000;  // use env file

app.use(cors())
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/LibrarySystem', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}as any)
    .then(() => {
        console.log('✅ MongoDB connected');
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
    });

app.get('/', (req: Request, res: Response) => {
    res.send('MongoDB is Connected');
});

app.use("/api",rootRouter)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
