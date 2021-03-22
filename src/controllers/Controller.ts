import { Request, response, Response } from "express";
import { Model, Document, FilterQuery, Schema } from "mongoose";
import qs2m from 'qs-to-mongo'
import { MongoClient } from 'mongodb'
import { MongoEntityManager } from "typeorm";

export default class Controller<T extends Document> {
  // - GET - returns all objects
  protected getAll(request: Request, response: Response, currentObject: Model<T, {}>) {
    if (JSON.stringify(request.query) !== "{}") {
      MongoClient.connect(process.env.DB_CONNECTION, function (err, db) {
        if (err) throw err;
        var dbo = db.db("SantoPostoDB");
        dbo.collection("users").find(request.query).toArray(function (err, result) {
          if (err) {
            response.status(500).json({ error: err })
          }
          console.log("Passou pelo MongoClient !!")
          response.status(200).json(result)
          db.close();
        });
      });
    } else {
      currentObject.find()
        .exec()
        .then(docs => {
          // if (docs.length >= 0) {
          console.log("Passou pelo Mongoose !!")
          response.status(200).json(docs)
          // } else {
          //   response.status(404).json({ message: 'No entries found' })
          // }
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
  protected deleteById(request: Request, response: Response, currentObject: Model<T, {}>) {
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

  // - PUT - # updates object with chosen id
  protected async update(request: Request, response: Response, currentObject: Model<T, {}>) {
    const body = new currentObject(request.body);

    currentObject.remove({ _id: request.params._id })
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

    // currentObject.findByIdAndUpdate(request.params._id, request.body)
    //   .exec()
    //   .then(result => {
    //     console.log("--------- atualizou: " + result)
    //     response.status(204).json(result)
    //   })
    //   .catch(err => {
    //     response.status(500).json({ error: err })
    //   })
  }
}
