import { Entity, EntityRepository, Repository } from "typeorm";
import { UserStationRates } from "../models/UserStationRates";

@EntityRepository(UserStationRates)
class UserStationRatesRepository extends Repository<UserStationRates> {}

export { UserStationRatesRepository };