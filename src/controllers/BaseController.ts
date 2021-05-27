import { Request, Response } from "express";
import { Model, Document, Query } from "mongoose";
import { MongoClient } from 'mongodb'
import { User } from '../schemas/User'
import jsontoken from 'jsonwebtoken';
import { IStation, Station } from "../schemas/Station";
import { IRating, Rating } from "../schemas/Rating";
import { nextTick } from "process";
import {geolocation} from "../StationGeolocation/StationFilterGeolocation";

export default class Controller<T extends Document> {

  // - GET - returns all objects
  protected getAll(request: Request, response: Response, currentObject: Model<T, {}>, collectionName) {
    if (JSON.stringify(request.query) !== "{}") {
      MongoClient.connect(process.env.DB_CONNECTION, function (err, db) {

        if (err) throw err;

        var dbo = db.db(process.env.DB_NAME);

        dbo.collection(collectionName)
          .find(request.query)
          .toArray(function (e, result) {
            if (e) {
              response
                .status(500)
                .json({ error: e })
            }
            response.status(200).json(result)
            db.close();
          });
      });
    } else {
      currentObject.find()
        .exec()
        .then(docs => {
          response.status(200).json(docs)
        })
        .catch(err => {
          response.status(500).json({ error: err })
        })
    }
  }

  // - GET - returns object with chosen id
  protected getById(request: Request, response: Response, currentObject: Model<T, {}>) {
    currentObject.findById(request.params._id)
      .exec()
      .then(doc => {
        if (doc) {
          response.status(200).json(doc)
        } else {
          response.status(404).json({ message: 'No valid entry found for provided ID' })
        }
      })
      .catch(err => {
        response.status(500).json({ error: err })
      })
  }

  // - POST - inserts new object into Collection
  protected add(request: Request, response: Response, currentObject: Model<T, {}>) {
    const body = new currentObject(request.body);

    body.save().then(result => {
      response.status(201).json({
        message: 'Inserido!',
        created: result
      })
    }).catch(err => {
      response.status(500).json({ error: err })
    })
  }

  // - DELETE - deletes object with chosen id
  protected async deleteById(request: Request, response: Response, currentObject: Model<T, {}>) {
    const id = request.params._id
    currentObject.remove({ _id: id })
      .exec()
      .then(result => {
        response.status(200).json(result)
      })
      .catch(err => {
        response.status(500).json({ error: err })
      })
  }

  // - PUT - # updates User with chosen id
  protected async updateUser(request: Request, response: Response) {
    const body = new User(request.body);

    User.remove({ _id: request.params._id })
      .exec()
      .catch(err => {
        response.status(500).json({ error: err })
      })

    body.save()
      .then(result => {
        response.status(204).json({
          message: 'Atualizado!',
          created: result
        })
      }).catch(err => {
        response.status(500).json({ error: err })
      })
  }

  // - PUT - # updates object with chosen id
  protected async update(request: Request, response: Response, currentObject: Model<T, {}>) {
    currentObject.findByIdAndUpdate(request.params._id, request.body)
      .exec()
      .then(result => {
        response.status(204).json(result)
      })
      .catch(err => {
        response.status(500).json({ error: err })
      })
  }

  // - ADD StationRatingCounter
  public async addStationRatingCounter(request: Request, response: Response) {
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
  public subtractStationRatingCounter(request: Request, response: Response) {
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
  private updateStationRatingAverageOnAdd(num: number, rating: number, rate: any, novoValor: number) {
    return ((num * rating) + Number(rate)) / novoValor
  }

  // - UPDATE StationRatingAverage on INSERT
  private updateStationRatingAverageOnDelete(num: number, rating: number, rate: any, novoValor: number) {
    console.log("passou aqui")
    return ((num * rating) - Number(rate)) / novoValor
  }

  // - GET TOKEN FOR ACCESS
  public async getToken(request: Request, response: Response) {
    if (request.body.user === 'SantoPosto' && request.body.password === 'adm') {
      const token = jsontoken.sign({ userId: 1 }, process.env.SECRET, { expiresIn: 300 });
      return response.json({ auth: true, token });
    }
    response.status(401).end();
  }

  // - GET - returns a list of objects that has the values of geolocalization near of user search
  protected getByGeolocation(request: Request, response: Response, currentObject: Model<T, {}>) {
    currentObject.collection.find({
      location:
        { $near:
           {
             $geometry: { type: "Point",  coordinates: [request.body.lat, request.body.lng ] },
             $minDistance: 0,
             $maxDistance: 3000
           }
        }
    })//.then(doc => {
      //  if (doc) {
      //    
      //    response.status(200).json(doc)
      //  } else {
      //    response.status(404).json({ message: 'No valid entry found for provided ID' })
      //  }
      //})
      //.catch(err => {
      //  response.status(500).json({ error: err })
      //})
  }
}