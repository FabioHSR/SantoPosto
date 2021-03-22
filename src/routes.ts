import { Router } from "express";
import UserController from "./controllers/UserController";
import RatingController from "./controllers/RatingController";
import StationController from "./controllers/StationController";

const router = Router();

// ----- User -----
const userController = new UserController()

// INSERT
router.post("/User", (request, response) => {
  userController.add(request, response)
})

// GET ALL
router.get("/Users", (request, response, next) => {
  userController.getAll(request, response)
})

// GET BY ID
router.get("/User/:_id", (request, response) => {
  userController.getById(request, response)
})

// DELETE BY ID
router.delete("/User/:_id", (request, response) => {
  userController.deleteById(request, response)
})

// UPDATE
router.patch("/User/:_id", (request, response) => {
  userController.updateUser(request, response)
})

// - Rating -
const ratingController = new RatingController()
router.get("/answers/:value",)

// - GasStation -
const stationController = new StationController()

router.get("/postos", (request, response) => {
  stationController.getAll(request, response);
})

router.get("/postos/{id}", (request, response) => {
  stationController.getById(request, response);
})

router.post("/postos/{id}")
// router.delete()
// router.put()


export { router };