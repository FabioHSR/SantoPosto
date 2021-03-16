import { Request, Response } from "express";
import { getCustomRepository,Not,IsNull } from "typeorm";
import { UserStationRatesRepository } from "../repositories/UserStationRatesRepository";

class GasStationController{

    async execute(request: Request, response: Response){
        const {station_id} = request.params;
        const userStationRatesRepository = getCustomRepository(UserStationRatesRepository);
        const userStationRates = await userStationRatesRepository.find({
            station_id: Number(station_id)
        })
        let sum = 0;
         const detractors = userStationRates.forEach((answer)=>{
            sum += answer.rate
         })
         const totalAnswers = userStationRates.length;

         const average = Number((sum / totalAnswers).toFixed(1));

         return response.json({
            average,
            totalAnswers,
         })
    }
}

export {GasStationController}