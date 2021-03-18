import express, {Request, Response, Router} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authenticate from '../../utils/auth'

import isValidEmail from '../../utils/emailValidator';
import User from '../../modals/User';

const router: Router = express.Router();

// Router:   GET /api/users/ public
router.get('/', async (req: Request, res: Response) => {
    const context = req.get("Authorization");
    if (context) {
        try {
            const user = jwt.verify(context, process.env.PrivateKey||"");
            if(user){
                const users = await User.findAll({attributes: { exclude: ['password'] }});
                res.send(users)
            }
        } catch (error) {
            res.send({msg:error.message})
        }
    } else
        res.send({msg:"no authorization"})
});

// Router:   POST /api/users/register
router.post('/signup', async (req: Request, res: Response) => {
    const {firstname, lastname, email, password} = req.body;
    if (firstname && lastname && isValidEmail(email) && password) {
        try {
            const hashPassword: String = await bcrypt.hash(password, 12);
            const user: User = await User.create({firstname, lastname, email, password: hashPassword});
            const token = jwt.sign({firstname, lastname, email}, process.env.PrivateKey || '', {expiresIn: '1m'});
            res.send({firstname, lastname, email, token});
        } catch (err) {
            console.error(err);
        }
    } else {
        res.send({msg:"invalid"});
    }
});

// Router:   POST /api/users/login public
router.post('/login', async (req: Request, res: Response) => {
    const {email, password} = req.body;
    if (isValidEmail(email) && password) {
        try {
            const user: User | null = await User.findOne({where: {email}});
            if (user !== null) {
                const match = await bcrypt.compare(password, user.password)
                if (match) {
                    const token = jwt.sign({
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email
                    }, process.env.PrivateKey || '', {expiresIn: '1m'});
                    res.send({firstname: user.firstname, lastname: user.lastname, email: user.email, token:token});
                } else {
                    res.send({password: 'credentials invalid'});
                }
            }else{
                res.send({password: 'credentials invalid'});
            }
        } catch (err) {
            console.log(err.message);
            res.send({msg: err.message});
        }
    } else {
        res.send({msg: 'credentials invalid'});
    }
});

export default router;