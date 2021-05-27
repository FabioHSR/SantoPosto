import { NextFunction } from "express";
import geolib from "geolib";
import { Request, Response } from "express";
import StationController from "../controllers/StationController";

const Namespace = "Geolocation";


const FindGeolocation = (request: Request, response: Response, next: NextFunction) =>{
    let latUser = request.params.lat
    let lngUser = request.params.lat

    //TODO: Ajustar pra capturar os dados dos objetos na base
    let latPosto = 123
    let lngPosto = 123

    if(latUser && lngUser){
      var distance =  geolib.getDistance({latitude: latUser, longitude: lngUser},
            { latitude: latPosto, longitude: lngPosto })
       //TODO: ajustar pra retornar a station
      if(distance <= 2){
          return Object
      }      
    }
    else{
        response.status(401).end();
    }

  }

export default tokenExtract;