import dotenv from 'dotenv'
import { bootstrab } from "./src/app.js";
import express from 'express'
import corsOptions from "./src/common/config/corsOptions.js";
import cors from 'cors'
const app = express();
dotenv.config()
app.use(cors(corsOptions))
bootstrab(app,express)
const Port = 3000

app.listen(Port,()=>{
    console.log(`app is working on port ${Port}`)
})