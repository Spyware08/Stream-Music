import { Router } from "express";
import { Usermodel } from "../DataBase/Db.js";
import { createHashing } from "../Functions/Hashing/createHash.js";

export let Signupdata = Router()

Signupdata.post("/signup", async (req, res) => {
    const {username, useremail, userpassword} = req.body

    if (username && useremail && userpassword) {
        const existuser = await Usermodel.findOne({ useremail })
        if (existuser) {
            return res.status(409).send("User email already Exist")
        }
        else {
            const insertdata = await User_adding(req.body)

            if (insertdata) {
                return res.send("created")
            }
            return res.send(" error while Creating")
        }
    }

    return res.send("Server Error from Backend")

})

const User_adding = async (e) => {

    try {
        const {userpassword} = e
        if (userpassword) {
            const hashing = await createHashing(userpassword)
            if (hashing) {
                e.userpassword = hashing

                const userData = await Usermodel.create(e)
                if (userData) {
                    console.log("data created in mongo", userData);
                    return true;

                }
                return false;

            }
        }
    }
    catch (e) {
        console.log("error in Useradding function");
    }



}