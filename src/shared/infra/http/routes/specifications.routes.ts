import { Router } from "express";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const specificationRoutes = Router();

let createSpecificationController = new CreateSpecificationController();

specificationRoutes.post(
	"/",
	ensureAuthenticate,
	ensureAdmin,
	createSpecificationController.handle
);

export { specificationRoutes };
