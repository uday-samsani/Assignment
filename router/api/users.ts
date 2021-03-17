import express, {Request, Response, Router} from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import isValidEmail from "../../utils/emailValidator"
import User from "../../modals/User"

const router: Router = express.Router()

// Router:   GET /api/users/ public
router.get('/', (req: Request, res: Response) => {
    res.send({msg: 'Hello again'})
})

// Router:   POST /api/users/register
router.post('/register', async (req: Request, res: Response) => {
    const {firstname, lastname, email, password} = req.body
    if (firstname && lastname && isValidEmail(email) && password) {
        try {
            const hashPassword: String = await bcrypt.hash(password, 10);
            const user: User = await User.create({firstname, lastname, email, password: hashPassword})
            const token = jwt.sign({firstname, lastname, email}, process.env.PrivateKey || "", {expiresIn: "1m"})
            res.send({token})
        } catch (err) {
            console.error(err)
        }
    } else {
        res.send("invalid")
    }
})

// Router:   POST /api/users/login
router.post('/login', async (req: Request, res: Response) => {
    const {email, password} = req.body
    if (isValidEmail(email) && password) {
        try {
            const user: User | null = await User.findOne({where: {email}})

            if (user && await bcrypt.compare(password, user ? user.password : "")) {
                const token = jwt.sign({
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                }, process.env.PrivateKey || "", {expiresIn: "1m"})
                res.send({token})
            } else {
                res.send({password: "credentials invalid"})
            }
        } catch (err) {
            console.log(err.message)
        }
    }
})

export default router;