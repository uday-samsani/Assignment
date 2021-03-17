import express, {Request, Response, Router} from "express";
import isValidEmail from "../../utils/emailValidator";
import User from "../../modals/User";
import {canTreatArrayAsAnd} from "sequelize/types/lib/utils";

const router: Router = express.Router();

// Router:   GET /api/users/ public
router.get('/', (req: Request, res: Response) => {
    res.send({msg: 'Hello again'})
})

// Router:   POST /api/users/register
router.post('/register', async (req: Request, res: Response) => {
    const {name, email, password} = req.body
    if (name && isValidEmail(email) && password) {
        try {
            const user: User = await User.create(req.body)
            res.send(user)
        } catch (err) {
            console.error(err)
        }
    } else {
        res.send("invalid")
    }
})

// Router:   POST /api/users/login
router.post('/login',  (req: Request, res: Response) => {

})

export default router;