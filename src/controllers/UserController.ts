import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { IUser, User } from '../schemas/User'
import BaseController from "./BaseController";

export default class UserController extends BaseController<IUser> {

    // - GET - /users # returns all Users
    getAll(request: Request, response: Response) {
        super.getAll(request, response, User, process.env.USERS_COLLECTION_NAME)
    }

    // - GET - /user/{id} # returns User with chosen id
    getById(request: Request, response: Response) {
        super.getById(request, response, User)
    }

    // - POST - /user # inserts new User into Collection
    add(request: Request, response: Response) {
        const { email } = request.body
        let userAlreadyExists

        User.exists({ 'email': email }, function (err, doc) {
            if (err) {
                console.log(err)
                userAlreadyExists = false
            } else {
                userAlreadyExists = true
            }
        });

        if (userAlreadyExists) {
            throw new AppError("User already exists");
        }
        return super.add(request, response, User)
    }

    // - DELETE - /user/{id} # deletes User with chosen id
    async deleteById(request: Request, response: Response) {
        super.deleteById(request, response, User)
    }

    // - PUT - /user/{id} # updates User with chosen id
    updateById(request: Request, response: Response) {
        super.updateUser(request, response)
    }

    // - POST - /user/login
    // login() {

    // }
}