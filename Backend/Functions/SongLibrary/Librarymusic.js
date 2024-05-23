import { Router } from "express";
import { Usermodel } from "../../DataBase/Db.js";


export const FavList = Router();

FavList.post("/favsong", async (req, res) => {
    const { email } = req.body
    console.log(email);

    try {
        const exist_user = await Usermodel.findOne({ useremail: email }).lean()

        if (exist_user) {
            const { MusicList } = exist_user
            let userdata = { MusicList }
            res.status(200).json(userdata)
            console.log(userdata);
        }

    }
    catch (e) {
        console.log("err", e);
    }

})