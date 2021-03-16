import { Entity, EntityRepository, Repository } from "typeorm";
import { GasStation } from "../models/GasStation";

@EntityRepository(GasStation)
class GasStationRepository extends Repository<GasStation> {}

export { GasStationRepository };