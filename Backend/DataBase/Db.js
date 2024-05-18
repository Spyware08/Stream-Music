import mongoose, { Schema } from "mongoose"
import * as dotenv from "dotenv"
dotenv.config()

const User = new Schema({
    username: { type: String },
    useremail: { type: String },
    userpassword: { type: String },
    MusicList: [{ type: String, default:""}],

})

export const Usermodel = mongoose.model("Userdata", User)


export function DbConenction() {

    mongoose.connect(process.env.MongoUrl).then(()=>{
        const db=mongoose.connection.useDb("Stream Music")
        console.log("Data connected");
    }).catch((e)=>{
        console.log("err with",e);
    })

}