import express from "express"
import { DbConenction } from "./DataBase/Db.js"
import { Signupdata } from "./Routes/Signup.js"
import { LoginRoute } from "./Routes/Signin.js"
import { Verifier } from "./Functions/TokenVerifing/TokenVerifier.js"

import cors from "cors"
const app=express()
const port=8080
DbConenction()

let cors_option={
    origin:"http://192.168.0.106:5173",
    credentials:true
}

app.use(express.json())
app.use(cors(cors_option))

app.use(Verifier)

app.use(Signupdata)
app.use(LoginRoute)
app.listen(port,()=>console.log("server is running",port))