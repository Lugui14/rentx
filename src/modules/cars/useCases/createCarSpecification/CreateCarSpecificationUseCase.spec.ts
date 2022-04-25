import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";
import { InMemorySpecificationRepository } from "@modules/cars/repositories/in-memory/InMemorySpecificationRepository";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

import { AppError } from "@shared/errors/AppError";

let carsRepositoryInMemory: InMemoryCarsRepository;
let specificationRepositoryInMemory: InMemorySpecificationRepository;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create car specification", () => {
	beforeEach(() => {
		carsRepositoryInMemory = new InMemoryCarsRepository();
		specificationRepositoryInMemory = new InMemorySpecificationRepository();
		createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
			carsRepositoryInMemory,
			specificationRepositoryInMemory
		);
	});

	it("should be able to create a car specification", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Car Name",
			description: "Car Description",
			daily_rate: 100,
			license_plate: "abc-123",
			fine_amount: 60,
			brand: "toyota",
			category_id: "category",
		});

		const specification = await specificationRepositoryInMemory.create({
			name: "test",
			description: "test",
		});

		const specifications_id = [specification.id];

		const specificationsCar = await createCarSpecificationUseCase.execute({
			car_id: car.id,
			specifications_id,
		});

		expect(specificationsCar).toHaveProperty("specifications");
		expect(specificationsCar.specifications.length).toBe(1);
	});

	it("should not be able to add a specification from a non-existent car", async () => {
		expect(async () => {
			const car_id = "1234";
			0;
			const specifications_id = ["54321"];

			await createCarSpecificationUseCase.execute({
				car_id,
				specifications_id,
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
