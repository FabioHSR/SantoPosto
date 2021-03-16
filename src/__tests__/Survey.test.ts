import e from 'express';
import request from 'supertest';
import createConnection from "../database"
import { app } from '../app';
import { getConnection } from 'typeorm';

//TODO: Update to our model

describe('Surveys', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async () => {
        const connection = await getConnection();
        await connection.dropDatabase();
        await connection.close();
    })

    it("Should be able to create a new survey", async () =>{
        const response = await request(app).post("/surveys").send({
            title: "Test survey title",
            description: "Test survey description"    
        })
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    })

    it("Should be able to get all surveys", async () =>{
        await request(app).post("/surveys").send({
            title: "Test survey title 2",
            description: "Test survey description 2"    
        })
        const response = await request(app).get("/surveys")
        
        // expect(response.status).toBe(201);
        expect(response.body).toHaveLength(2);
    })

})
