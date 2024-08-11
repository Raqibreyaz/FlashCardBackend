import express from "express";
import flashCardRouter from "./routes/flashCard.routes.ts";
import cors from 'cors'

const app = express();

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:['GET','POST','PUT','DELETE','PATCH']
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/flashcards", flashCardRouter);

export default app;
