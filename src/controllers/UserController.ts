import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UsersRepository";
import * as yup from 'yup'
import { AppError } from "../errors/AppError";
import { hash } from "bcryptjs";

class UserController {
    

    async create(request: Request, response: Response){
        const {name,email,password} = request.body;
        const usersRepository = getCustomRepository(UserRepository);

        const schema = yup.object().shape({
            name: yup.string().required("Invalid name."),
            email: yup.string().email().required("Invalid e-mail."),
            password: yup.string().required("Invalid password."),
        })

        try{
            await schema.validate(request.body,{abortEarly: false})
 
        }catch(err){

            return response.status(400).json({erro:err})
        }
        
        const userAlreadyExists = await usersRepository.findOne({
            email
        })
        if(userAlreadyExists){
            throw new AppError("User already exists");
        }

        const user = usersRepository.create({
            email,
            password,
            name,
        });
        user.password = await hash(user.password, 10);

        console.log(user);

        await usersRepository.save(user);

        return response.status(201).json(user);
    }

    async login(request: Request, response: Response) {
        const {email,password} = request.body;
        const usersRepository = getCustomRepository(UserRepository);

        const user = await usersRepository.findOne({
            email
        })
        console.log(password)

        const result = await user.comparePassword(password);

        if (!result) {
            return response.status(202).json({
                message: 'Password or email is incorrect',
                status: 404,
            });
        }

        return response.status(202).json(user);
    }
}   

export { UserController };
