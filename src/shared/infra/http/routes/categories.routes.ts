import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const categoriesRoutes = Router();

const upload = multer({
	dest: "./tmp",
});

let createCategoryController = new CreateCategoryController();
let importCategoryController = new ImportCategoryController();
let listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
	"/",
	ensureAuthenticate,
	ensureAdmin,
	createCategoryController.handle
);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
	"/import",
	upload.single("file"),
	ensureAuthenticate,
	ensureAdmin,
	importCategoryController.handle
);

export { categoriesRoutes };
