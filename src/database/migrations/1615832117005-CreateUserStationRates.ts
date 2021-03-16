import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserStationRates1615832117005 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"user_station_rate",
                columns: [
                    {
                        name:"id",
                        type:"integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: "user_id",
                        type: "number",                        
                    },
                    {
                        name: "station_id",
                        type: "number",                        
                    },
                    {
                        name: "rate",
                        type: "number",     
                        isNullable: true                   
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"                        
                    },
                ],
                foreignKeys: [
                    {
                        name:"FKUser",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name:"FKStations",
                        referencedTableName: "gas_stations",
                        referencedColumnNames: ["id"],
                        columnNames: ["station_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_station_rate");
    }

}
