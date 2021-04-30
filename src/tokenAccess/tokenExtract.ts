import { NextFunction } from "express";
import jsonToken from "jsonwebtoken";
import { Request, Response } from "express";
import { CustomError } from "express-handler-errors";



export const authorize = (
    req: Request,
    _: Response,
    next: NextFunction
  ): void => {
    // coletamos o token do header da requisição
    const token = req.headers.token;
  
    // se não existir o token, devolvemos 401, que é o HTTP code para não autorizado
    if (!token)
      return next(
        new CustomError({
          code: 'UNAUTHORIZED',
          message: 'Token não enviado',
          status: 401,
        })
      );
    try {
      // Aqui fazemos a validação do token
      const decoded = jsonToken.verify(token, process.env.SECRET) as any;
      if(req.headers.user == decoded.userId){
        //logger.info(`Authorize::user authorized::`);
        // No sucesso da validação a request segue em frente ...
        return next();
      }

      return next(
        new CustomError({
          code: 'UNAUTHORIZED',
          message: 'Usuario inválido',
          status: 401,
        }))

    } catch (e) {
      // Se der erro na validação, devolvemos 401 novamente
      //logger.error(`Authorize::error decode token::${e.message}`);
      return next(
        new CustomError({
          code: 'UNAUTHORIZED',
          message: 'Token inválido',
          status: 401,
        })
      );
    }
  };
  



































//const Namespace = "AUTH";
//
//const tokenExtract = (request: Request, response: Response, next: NextFunction) =>{
//    let token = request.headers['token']
//
//    if(token){
//
//        jsonToken.verify(token,process.env.SECRET, (error, decoded) => {
//            if(error)
//            {
//                return response.status(401).end()
//            }
//            else {
//                response.locals.jsonToken  = decoded
//                next();
//            }
//        })
//    }
//    else{
//        response.status(401).end();
//    }
//
//  }
//
//export default tokenExtract;