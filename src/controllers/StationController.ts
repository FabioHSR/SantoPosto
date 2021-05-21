import { Request, Response } from "express";
import { IStation, Station } from "../schemas/Station";
import BaseController from "./BaseController";

export default class StationController extends BaseController<IStation> {
    // - GET - /postos # returns all Gas Stations
    getAll(request: Request, response: Response) {
        super.getAll(request, response, Station, process.env.STATIONS_COLLECTION_NAME)
    }

    // - GET - /posto/{id} # returns Gas Station with chosen id
    getById(request: Request, response: Response) {
        super.getById(request, response, Station)
    }

    // - POST - /posto # inserts new Gas Station into Collection
    add(request: Request, response: Response) {
        super.add(request, response, Station)
    }

    // - DELETE - /posto/{id} # deletes Gas Station with chosen id
    deleteById(request: Request, response: Response) {
        super.deleteById(request, response, Station)
    }

    // - PUT - /posto/{id} # updates Gas Station with chosen id
    updateRating(request: Request, response: Response) {
        super.update(request, response, Station)
    }

        // - PUT - /posto/{id} # updates Gas Station with chosen id
    getByGeolocation(request: Request, response: Response) {
        super.getByGeolocation(request, response, Station)
    }
}
