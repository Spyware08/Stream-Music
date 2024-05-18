import { Router } from "express";
import { Usermodel } from "../DataBase/Db.js";
import HashVerifier from "../Functions/Hashing/VerifyHash.js";
import jwt from "jsonwebtoken";

export const LoginRoute = Router();

LoginRoute.post("/login", async (req, res) => {
    const { useremail, userpassword } = req.body;
    console.log(req.body);

    if (useremail && userpassword) {
        try {
            const exist_user = await Usermodel.findOne({ useremail });
            if (exist_user) {
                const isPassword = await HashVerifier({ plain_password: userpassword, hashed_password: exist_user.userpassword });
                if (isPassword) {
                    console.log("login");
                    const token = jwt.sign({ name: req.body.exist_user }, process.env.JWT_SECRET, { algorithm: "HS256", expiresIn: "1d" });
                    const { username, MusicList } = exist_user
                    let userdata = { username, MusicList };
                    console.log(userdata);
                    return res.status(200).json({ userdata, message: "logged in" });
                }
                return res.status(401).send("Wrong Password");
            }
            console.log("user not exist");
            return res.status(404).send("No user found");
        } catch (e) {
            console.error("Error", e);
            return res.status(500).send("Internal Server Error");
        }
    } else {
        return res.status(400).send("Email and password are required");
    }
});
