import  {Router} from "express";
import { UserController } from "./controllers/UserController";
import { AnswerController } from "./controllers/AnswerController";
import {GasStationController} from "./controllers/GasStationController";

const router = Router();

const userController = new UserController();
const answerController = new AnswerController();
const gasStationController = new GasStationController();

router.post("/users", userController.create);
router.get("/login", userController.login);

router.get("/answers/:value",answerController.execute)

router.get("/average/:station_id",gasStationController.execute)
router.get("/postos",gasStationController.list)


export { router };