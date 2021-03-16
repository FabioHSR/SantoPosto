import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import { GasStation } from "./GasStation";
import { User } from "./User";

@Entity("user_station_rate")
@Unique("UQ_KEY", ["user_id", "station_id"])//Unique pair constraint
class UserStationRates {
    
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    user_id: number;

    @ManyToOne(() => User)
    @JoinColumn({name: "user_id"})
    user: User

    @Column()
    station_id: number;

    @ManyToOne(() => GasStation)
    @JoinColumn({name: "station_id"})
    station: GasStation;

    @Column()
    rate: number;

    @CreateDateColumn()
    created_at: Date;
}

export {UserStationRates}