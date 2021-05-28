import { Request, Response } from "express";
import { IRating, Rating } from '../schemas/Rating'
import BaseController from "./BaseController";
import StationController from "./StationController";

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
        StationController.addStationRatingCounter(request, response)
        super.add(request, response, Rating)
    }

    // - DELETE - /rating/{id} # deletes Rating with chosen id
    async deleteById(request: Request, response: Response) {
        await (StationController.subtractStationRatingCounter(request, response))
            .then(result => {
                super.deleteById(request, response, Rating)
            })
            .catch(err => {
                response.status(500).json({ error: err })
            });
    }

    // - PUT - /rating/{id} # updates Rating with chosen id
    updateRating(request: Request, response: Response) {
        super.update(request, response, Rating)
    }
}