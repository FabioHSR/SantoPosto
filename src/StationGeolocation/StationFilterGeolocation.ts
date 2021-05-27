import { NextFunction } from "express";
import { Request, Response } from "express";
import { Model, Document } from "mongoose";
import { MongoClient } from 'mongodb'
import { User } from '../schemas/User'
import { isJSDocUnknownTag } from "typescript";
import expressJwt from 'express-jwt';
import jsontoken from 'jsonwebtoken';
import { nextTick } from "process";
import StationController from "../controllers/StationController";
import { Station } from "../schemas/Station";

const Namespace = "Geolocation";


const FindGeolocation = (request: Request, response: Response, next: NextFunction) =>{
if(request.body.lat, request.body.lng ){
    Station.collection.find({
      location:
        { $near:
           {
             $geometry: { type: "Point",  coordinates: [request.body.lat, request.body.lng ] },
             $minDistance: 0,
             $maxDistance: 3000
           }
        }
    }).next();
  }else{
    response.status(401).end();

  }
}

export default FindGeolocation;