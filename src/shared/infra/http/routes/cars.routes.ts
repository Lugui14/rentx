import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const carsRoutes = Router();

let createCarController = new CreateCarController();
let listAvailableCarsController = new ListCategoriesController();

carsRoutes.post(
	"/",
	ensureAuthenticate,
	ensureAdmin,
	createCarController.handle
);

carsRoutes.post("/available", listAvailableCarsController.handle);

export { carsRoutes };
