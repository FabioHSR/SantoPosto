import { Request, Response } from "express";
import { IRating, Rating } from '../schemas/Rating'
import BaseController from "./BaseController";

export default class RatingController extends BaseController<IRating> {
    // - GET - /ratings # returns all Ratings
    getAll(request: Request, response: Response) {
        super.getAll(request, response, Rating, process.env.RATINGS_COLLECTION_NAME)
    }

    // - GET - /rating/{id} # returns Rating with chosen id
    getById(request: Request, response: Response) {
        super.getById(request, response, Rating)
    }

    // - POST - /rating # inserts new Rating into Collection
    add(request: Request, response: Response) {
        super.add(request, response, Rating)
    }

    // - DELETE - /rating/{id} # deletes Rating with chosen id
    deleteById(request: Request, response: Response) {
        super.deleteById(request, response, Rating)
    }

    // - PUT - /rating/{id} # updates Rating with chosen id
    updateRating(request: Request, response: Response) {
        super.update(request, response, Rating)
    }
}