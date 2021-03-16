import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { UserStationRatesRepository } from "../repositories/UserStationRatesRepository";

class AnswerController{
    async execute(request: Request, response: Response){
        const {value} = request.params;
        const { station_id,user_id } = request.query;
        console.log("answer request"+station_id+user_id);

        const gasStationRepository =  getCustomRepository(UserStationRatesRepository);

         var gasStatiion = await gasStationRepository.findOne({
            where: {station_id: Number(station_id),user_id: Number(user_id)},   
            relations: ["user","station"]        
        })

        if(!gasStatiion)
        {
             gasStatiion = gasStationRepository.create({
                user_id: Number(user_id),
                station_id: Number(station_id),
                rate: Number(value)   
            });
            return response.json(gasStatiion);
        }

        console.log(gasStatiion);

        gasStatiion.rate = Number(value);

        await gasStationRepository.save(gasStatiion);

        return response.json(gasStatiion);
    }
}

export { AnswerController}