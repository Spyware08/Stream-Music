import bcrypt from "bcrypt"

export async function createHashing(plain_password) {
    try {
        const hash = await bcrypt.hash(plain_password.toString(), 10)
        console.log("hashPassword", hash);
        return hash
    } catch (e) {
        console.log("error while hashing");
        return e

    }


}