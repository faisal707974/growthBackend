import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import routes from './routes/index.js'

const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())

app.use('/',routes)

app.listen(process.env.PORT,()=>{
    console.log('server started running on port '+process.env.PORT)
})