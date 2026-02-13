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

const cors_options = {
    origin: ["https://stream-music-song.vercel.app" ],
    credentials: true,
};
app.use(express.json())
app.use(cors(cors_options))

app.get("/", async (req, res) => {
   

    return res.send({msg:"Running"})

})

// app.use(Verifier)

app.use(Signupdata)
app.use(LoginRoute)
app.use(Library)
app.use(FavList)
app.listen(port,()=>console.log("server is running",port))
