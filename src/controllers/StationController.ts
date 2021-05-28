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
    console.log("passou aqui")
    return ((num * rating) - Number(rate)) / novoValor
  }

       
    //getByGeolocation(request: Request, response: Response) {
    //    super.getByGeolocation(request, response, Station)
    //}

    // - GET - returns a list of objects that has the values of geolocalization near of user search
    getByGeolocation(request: Request, response: Response) {
    Station.find({location:
      { 
        $near: {
          $geometry: {
             type : "Point",
             coordinates : [ request.body.lng, request.body.lat ]
          },
          $minDistance: 1,
          $maxDistance: 6215
       }

      }
    }).exec().then(
      doc => {
          if (doc) {
            response.status(200).json(doc)
          } else {
            response.status(404).json({ message: 'No valid entry found for provided ID' })
          }
        }
    )
  }
}
