import { Request, Response } from "express";
import { getCustomRepository,Not,IsNull } from "typeorm";
import { GasStationRepository } from "../repositories/GasStationRepository";
import { UserStationRatesRepository } from "../repositories/UserStationRatesRepository";

class GasStationController{

    async list(request: Request, response: Response){
        var {FU,city,district,distributor} = request.query;
        console.log(request.query)

        FU = FU ? FU : '-1';
        city = city ? city : '-1';
        district = district ? district : '-1';      
        distributor = distributor ? distributor : '-1';

        const gasStationRepository = getCustomRepository(GasStationRepository);

        const gasStationList = await gasStationRepository
        .createQueryBuilder("gas_station")
        .where(
        "(gas_station.FU = :FU OR '-1' = :FU)"+
        "AND (gas_station.city = :city OR '-1' = :city)"+
        "AND (gas_station.district = :district OR '-1' = :district)"+
        "AND (gas_station.distributor = :distributor OR '-1' = :distributor)"
        ,{
            FU: FU, 
            city: city, 
            district: district,
            distributor: distributor
        })
        .getMany();

        if(!gasStationList){
            return response.status(202).json({
                message: 'Not found',
                status: 404,
            });
        }

        return response.status(200).json(
            {
            count: gasStationList.length,
            data: gasStationList
        })
    }

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