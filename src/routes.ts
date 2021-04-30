import { Router } from "express";
import BaseController from "./controllers/BaseController";
import UserController from "./controllers/UserController";
import RatingController from "./controllers/RatingController";
import StationController from "./controllers/StationController";
import {authorize}  from "./tokenAccess/tokenExtract";

const router = Router();

// ----- Início User Routes -----
const userController = new UserController();
// Initial Page
router.get("/" ,authorize, (request, response) => {
  response.send("Welcome to our Heroku Application of Santo Posto!")
})
// INSERT
router.post("/user",authorize,(request, response) => {
  userController.add(request, response)
})
// GET ALL
router.get("/users", authorize, (request, response) => {
  userController.getAll(request, response)
})
// GET BY ID
router.get("/user/:_id",authorize, (request, response) => {
  userController.getById(request, response)
})
// DELETE BY ID
router.delete("/user/:_id",authorize, (request, response) => {
  userController.deleteById(request, response)
})
// UPDATE
router.patch("/user/:_id",authorize, (request, response) => {
  userController.updateById(request, response)
})
// ----- Fim User Routes -----

// ----- Início Rating Routes -----
const ratingController = new RatingController()
// INSERT
router.post("/rating", authorize,(request, response) => {
  ratingController.add(request, response)
})
// GET ALL
router.get("/ratings",authorize, (request, response) => {
  ratingController.getAll(request, response)
})
// GET BY ID
router.get("/rating/:_id", authorize, (request, response) => {
  ratingController.getById(request, response)
})
// DELETE BY ID
router.delete("/rating/:_id", authorize,(request, response) => {
  ratingController.deleteById(request, response)
})
// UPDATE
router.patch("/rating/:_id", authorize,(request, response) => {
  ratingController.updateRating(request, response)
})
// ----- Fim Rating Routes -----

// ----- Início Station Routes -----

const stationController = new StationController()
// INSERT
router.post("/station",authorize, (request, response) => {
  stationController.add(request, response)
})
// GET ALL
router.get("/stations",authorize, (request, response) => {
  stationController.getAll(request, response)
})
// GET BY ID
router.get("/station/:_id",authorize, (request, response) => {
  stationController.getById(request, response)
})
// DELETE BY ID
router.delete("/station/:_id",authorize, (request, response) => {
  stationController.deleteById(request, response)
})
// UPDATE
router.patch("/station/:_id",authorize, (request, response) => {
  stationController.updateRating(request, response)
})
// ----- Fim Station Routes -----


// ----- Início Base Routes -----

const baseController = new BaseController()

// GET ALL
router.post("/Token", (request, response) => {
  baseController.getToken(request, response)
})



// ----- Fim Base Routes -----
export { router };