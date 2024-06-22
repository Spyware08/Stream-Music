import express from "express"
import { DbConenction } from "./DataBase/Db.js"
import { Signupdata } from "./Routes/Signup.js"
import { LoginRoute } from "./Routes/Signin.js"
import { Library } from "./Functions/SongLibrary/Library.js"
import { FavList } from "./Functions/SongLibrary/Librarymusic.js"
import cors from "cors"
const app=express()
const port=8080
DbConenction()

let cors_option={
    origin:["https://stream-music-gamma.vercel.app","http://192.168.224.94:5173"],
    credentials:true
}

app.use(express.json())
app.use(cors(cors_option))

// app.use(Verifier)

app.use(Signupdata)
app.use(LoginRoute)
app.use(Library)
app.use(FavList)
app.listen(port,()=>console.log("server is running",port))