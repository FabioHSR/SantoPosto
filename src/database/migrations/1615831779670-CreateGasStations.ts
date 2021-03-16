import {Column, MigrationInterface, QueryRunner, Table} from "typeorm";


export class CreateGasStations1615831779670 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "gas_stations",
                    columns: [
                        {
                            name: "id",
                            type: "integer",
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: 'increment',
                        },
                        {
                            name: "CNPJ",
                            type: "varchar",
                        },
                        {
                            name: "company_name",
                            type: "varchar",
                        },
                        {
                            name: "address",
                            type: "varchar",
                        },
                        {
                            name: "complement",
                            type: "varchar",
                        },
                        {
                            name: "district",
                            type: "varchar",
                        },
                        {
                            name: "zip_code",
                            type: "number",
                        },
                        {
                            name: "FU",
                            type: "number",
                        },
                        {
                            name: "city",
                            type: "varchar",
                        },
                        {
                            name: "distributor",
                            type: "varchar",
                        },
                        {
                            name: "authorization_code",
                            type: "varchar",
                        },
                        {
                            name: "authorization_date",
                            type: "timestamp",
                            default: "now()"
                        },
                        {
                            name: "simp",
                            type: "number",
                        },            
                    ]
                }
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("gas_stations");
    }

}
