import express from "express"
import { DbConenction } from "./DataBase/Db.js"
import { Signupdata } from "./Routes/Signup.js"
import { LoginRoute } from "./Routes/Signin.js"

import cors from "cors"
const app=express()
const port=8080
DbConenction()

let cors_option={
    origin:"http://192.168.49.76:5173",
    credentials:true
}

app.use(express.json())
app.use(cors(cors_option))

app.use(Signupdata)
app.use(LoginRoute)
app.listen(port,()=>console.log("server is running",port))