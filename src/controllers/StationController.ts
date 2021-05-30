import { Request, Response } from "express";
import { Query } from "mongoose";
import { IRating, Rating } from "../schemas/Rating";
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
  async deleteById(request: Request, response: Response) {
    super.deleteById(request, response, Station)
  }

  // - PUT - /posto/{id} # updates Gas Station with chosen id
  updateStation(request: Request, response: Response) {
    super.update(request, response, Station)
  }

  // - ADD StationRatingCounter
  public static async addStationRatingCounter(request: Request, response: Response) {
    const stationId = request.body.station_id

    const stationResponse: Query<IStation, IStation, {}> = Station.findById(stationId)

    const rate = request.body.rate
    const num = (await stationResponse).rating_num
    const rating = (await stationResponse).rating

    if (num == undefined) {
      Station.updateMany(
        { _id: stationId },
        { rating_num: 1 },
        { multi: true },
        function (err, numberAffected) { });
    } else {
      const novoValor = num + 1
      const avg = this.updateStationRatingAverageOnAdd(
        num,
        rating,
        rate,
        novoValor
      )
      Station.findByIdAndUpdate(stationId, {
        "rating_num": novoValor,
        "rating": avg
      }).exec();
    }
  }

  // - DELETE StationRatingCounter
  public static subtractStationRatingCounter(request: Request, response: Response) {
    return new Promise(async resolve => {
      const ratingId = request.params._id
      const ratingResponse: Query<IRating, IRating, {}> = Rating.findById(ratingId)

      const rate = (await ratingResponse).rate
      const stationId = (await ratingResponse).station_id
      const stationResponse: Query<IStation, IStation, {}> = Station.findById(stationId)

      const num = (await stationResponse).rating_num
      const rating = (await stationResponse).rating

      if (num == undefined) {
        Station.updateMany(
          { _id: stationId },
          { rating_num: 0 },
          { multi: true },
          function (err, numberAffected) { });
        resolve("Created rating_num field!");
      } else {
        const novoValor = num - 1
        const avg = this.updateStationRatingAverageOnDelete(
          num,
          rating,
          rate,
          novoValor
        )
        Station.findByIdAndUpdate(stationId, {
          "rating_num": novoValor,
          "rating": avg
        }).exec();
        resolve("Station rating average updated!");
      }
    });
  }

  // - UPDATE StationRatingAverage on DELETE
  private static updateStationRatingAverageOnAdd(num: number, rating: number, rate: any, novoValor: number) {
    return ((num * rating) + Number(rate)) / novoValor
  }

  // - UPDATE StationRatingAverage on INSERT
  private static updateStationRatingAverageOnDelete(num: number, rating: number, rate: any, novoValor: number) {
    return ((num * rating) - Number(rate)) / novoValor
  }


  // - GET - Redirects the request to filtered or unfiltered search
  //TODO: Try to unify the queryes to dinamicly add the query part if filterString is not null
  getByGeolocation(request: Request, response: Response) {
    if (!request.body.filterString)
      return this.getByGeolocationUnfiltered(request, response);
    else
      return this.getByGeolocationFiltered(request, response);
  }
  // - GET - returns a list of top 100 stations near the user
  getByGeolocationUnfiltered(request: Request, response: Response) {
    Station.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [request.body.lng, request.body.lat] },
          distanceField: "distance",
          spherical: true
        }
      }
    ])
      .sort({ distance: 1 })
      .exec().then(
        doc => {
          if (doc) {
            response.status(200).json(doc)
          } else {
            response.status(404).json({ message: 'No valid entry found' })
          }
        }
      )
  }
  // - GET - returns a list of top 100 stations near the user, filtered by search pattern
  getByGeolocationFiltered(request: Request, response: Response) {
    var regex = new RegExp(request.body.filterString)
    Station.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [request.body.lng, request.body.lat] },
          distanceField: "distance",
          query: {
            $or: [
              { address: regex },
              { distributor: regex },
              { company_name: regex },
              { CNPJ: regex }
            ]
          },
          spherical: true
        }
      }
    ])
      .sort({ distance: 1 })
      .exec().then(
        doc => {
          if (doc) {
            response.status(200).json(doc)
          } else {
            response.status(404).json({ message: 'No valid entry found' })
          }
        }
      )
  }
}
