import {Request,Response,NextFunction} from "express"
export const restricted = (req:Request,res:Response,next:NextFunction) => {
    if(req.session && req.session.user){
        next()
    }else{
        res.status(403).json({error: "Forbidden"})
    }
}