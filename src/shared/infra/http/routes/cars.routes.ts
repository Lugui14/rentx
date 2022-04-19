import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

const carsRoutes = Router();

let createCarController = new CreateCarController();
let listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
	"/",
	ensureAuthenticate,
	ensureAdmin,
	createCarController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

export { carsRoutes };
