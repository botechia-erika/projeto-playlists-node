import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { handleHttpError } from '../errors/handleError.js';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_KEY

export const tokenSignIn = async ({userObj})=>{
    try {
        const sign = jwt.sign({
            id:userObj.id,
            accessKey: userObj.age,
        }, JWT_SECRET, {
            expiresIn: '2h'
        })

        return sign
    } catch (error) {
        handleHttpError(error, "ERROR_SIGN_IN_TOKEN", "Error signing in");
    }
}


export const tokenVerify = async (token) => {
    try {
        const decoded = await jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}