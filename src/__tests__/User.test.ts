import e from 'express';
import request from 'supertest';
import createConnection from "../database"
import { app } from '../app';

//TODO: Update to our model
describe('Users', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    it("Should be able to create a new user", async () =>{
        const response = await request(app).post("/users").send({
            email: "user@example",
            name: "User example"    
        })
        expect(response.status).toBe(201);
    })

    it("Should not be able to create a user with email already exists", async ()=>{
        const response = await request(app).post("/users").send({
            email: "user@example",
            name: "User example2"
        })
        expect(response.status).toBe(400);
    })


})
