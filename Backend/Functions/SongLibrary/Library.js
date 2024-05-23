import { Router } from "express";
import { Usermodel } from "../../DataBase/Db.js";

export const Library = Router();

Library.post("/library", async (req, res) => {
    console.log("id", req.body);
    const { email, id } = req.body;

    try {
        const exist_user = await Usermodel.findOne({ useremail: email });

        if (exist_user) {
            if (!exist_user.MusicList.includes(id)) {
                exist_user.MusicList.unshift(id);
                await exist_user.save();
                res.status(200).json({ message: "Song added to the library" });
            } else {
                res.status(403).json({ message: "Song is already in the library" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error adding song to library:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


