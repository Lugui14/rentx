import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const carsRoutes = Router();

let createCarController = new CreateCarController();

carsRoutes.post(
	"/",
	ensureAuthenticate,
	ensureAdmin,
	createCarController.handle
);

export { carsRoutes };
