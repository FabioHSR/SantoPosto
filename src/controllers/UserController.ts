import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import bcrypt, { compare, hash } from "bcryptjs";
import Controller from "./Controller";
import { IUser, User } from '../schemas/User'

export default class UserController extends Controller<IUser> {

    // - GET - /users # returns all Users
    getAll(request: Request, response: Response) {
        super.getAll(request, response, User)
    }

    // - GET - /user/{id} # returns User with chosen id
    getById(request: Request, response: Response) {
        super.getById(request, response, User)
    }

    // - POST - /user # inserts new User into Collection
    add(request: Request, response: Response) {
        const { email, password } = request.body
        let userAlreadyExists

        User.exists({ 'email': email }, function (err, doc) {
            if (err) {
                console.log(err)
                userAlreadyExists = false
            } else {
                console.log("Result :", doc) // false
                userAlreadyExists = true
            }
        });

        if (userAlreadyExists) {
            throw new AppError("User already exists");
        }

        // request.body.password = hash(password, 10)

        return super.add(request, response, User)
    }

    // - DELETE - /user/{id} # deletes User with chosen id
    deleteById(request: Request, response: Response) {
        super.deleteById(request, response, User)
    }

    // - PUT - /user/{id} # updates User with chosen id
    updateUser(request: Request, response: Response) {
        super.update(request, response, User)
    }
}