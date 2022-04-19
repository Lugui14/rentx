import { Router } from "express";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureAdmin } from "../middlewares/ensureAdmin";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationRoutes = Router();

let createSpecificationController = new CreateSpecificationController();

specificationRoutes.post(
	"/",
	ensureAuthenticate,
	ensureAdmin,
	createSpecificationController.handle
);

export { specificationRoutes };
