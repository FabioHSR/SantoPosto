import { getConnectionOptions } from "typeorm";
import { getConnection } from "typeorm";
import {Connection,createConnection} from "typeorm";

export default async (): Promise<Connection> =>{

    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions,{
            database: process.env.NODE_ENV === 'test' ? "./src/database/database.test.sqlite" : defaultOptions.database,
        })
    );
}