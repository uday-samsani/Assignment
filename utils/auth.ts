import jwt from "jsonwebtoken";

const authenticate = (token:string) => {
    if (token) {
        try {
            const user:any = jwt.verify(token, process.env.PrivateKey||"");
            return user;
        } catch (error) {
            throw new Error("Invalid/Expired token");
        }
    } else
        throw new Error("Authentication token must formatted as 'Bearer [token]");
};
export default authenticate;