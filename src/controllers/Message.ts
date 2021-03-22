import { Response } from "express";

export function returnMessage(err, response: Response) {
    if (err) {
        response.send(err)
    } else {
        response.send(response)
    }
}