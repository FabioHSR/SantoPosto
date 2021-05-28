import { NextFunction } from "express";
import jsonToken from "jsonwebtoken";
import { Request, Response } from "express";

const tokenExtract = (request: Request, response: Response, next: NextFunction) =>{
    let token = request.headers['token']

    if(token){

        jsonToken.verify(token,process.env.SECRET, (error, decoded) => {
            if(error)
            {
                return response.status(401).end()
            }
            else {
                response.locals.jsonToken  = decoded
                next();
            }
        })
    }
    else{
        response.status(401).end();
    }
  }
export default tokenExtract;