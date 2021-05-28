import { Router } from "express";
import BaseController from "./controllers/BaseController";
import UserController from "./controllers/UserController";
import RatingController from "./controllers/RatingController";
import StationController from "./controllers/StationController";
import tokenExtract from "./Authentication/Authentication";

const router = Router();

// ----- Início User Routes -----
const userController = new UserController();
// Initial Page
router.get("/", tokenExtract, (request, response) => {
  response.send("Welcome to our Heroku Application of Santo Posto!")
})
// INSERT
router.post("/user", (request, response) => {
  userController.add(request, response)
})
// GET ALL
router.get("/users", (request, response) => {
  userController.getAll(request, response)
})
// GET BY ID
router.get("/user/:_id", (request, response) => {
  userController.getById(request, response)
})
// DELETE BY ID
router.delete("/user/:_id", (request, response) => {
  userController.deleteById(request, response)
})
// UPDATE
router.patch("/user/:_id", (request, response) => {
  userController.updateById(request, response)
})
// ----- Fim User Routes -----

// ----- Início Rating Routes -----
const ratingController = new RatingController()
// INSERT
router.post("/rating", (request, response) => {
  ratingController.add(request, response)
})
// GET ALL
router.get("/ratings", (request, response) => {
  ratingController.getAll(request, response)
})
// GET BY ID
router.get("/rating/:_id", (request, response) => {
  ratingController.getById(request, response)
})
// DELETE BY ID
router.delete("/rating/:_id", (request, response) => {
  ratingController.deleteById(request, response)
})
// UPDATE
router.patch("/rating/:_id", (request, response) => {
  ratingController.updateRating(request, response)
})
// ----- Fim Rating Routes -----

// ----- Início Station Routes -----
const stationController = new StationController()
// INSERT
router.post("/station", (request, response) => {
  stationController.add(request, response)
})
// GET ALL
router.get("/stations", (request, response) => {
  stationController.getAll(request, response)
})
// GET BY ID
router.get("/station/:_id", (request, response) => {
  stationController.getById(request, response)
})
// DELETE BY ID
router.delete("/station/:_id", (request, response) => {
  stationController.deleteById(request, response)
})
// UPDATE
router.patch("/station/:_id", (request, response) => {
  stationController.updateStation(request, response)
})

// GET BY GEOLOCATION
router.get("/station/geolocation/search", (request, response) => {
  stationController.getByGeolocation(request, response)
})
// ----- Fim Station Routes -----


// ----- Início Token Routes -----
const baseController = new BaseController()

// POST TOKEN
router.post("/Token", (request, response) => {
  baseController.getToken(request, response)
})
// ----- Fim Token Routes -----

export { router };