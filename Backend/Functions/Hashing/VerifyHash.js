import bcrypt from "bcrypt"

export default async function HashVerifier({ plain_password, hashed_password }) {
    const isPassword = await bcrypt.compare(plain_password, hashed_password)
    return isPassword
}