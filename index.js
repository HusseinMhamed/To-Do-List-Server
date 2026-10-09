import { bootstrab } from "./src/app.js";
import express from 'express'

const app = express();
bootstrab(app,express)
const Port = 3000

app.listen(Port,()=>{
    console.log(`app is working on port ${Port}`)
})