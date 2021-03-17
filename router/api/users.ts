import express,{Router,Request,Response} from "express";

const router:Router=express.Router();

//router:   GET /api/users/ public
router.get('/',(req:Request,res:Response)=>{
    res.send({msg:'Hello again'})
})

//router:   POST /api/users/register
router.post('/register',(req:Request,res:Response)=>{
    res.send({req:req.body})
})

//router:   POST /api/users/login
router.post('/login',(req:Request,res:Response)=>{
    res.send({msg:'Hello login'})
})

export default router;