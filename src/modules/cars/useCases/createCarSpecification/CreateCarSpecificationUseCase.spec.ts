import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepositoryInMemory: InMemoryCarsRepository;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create car specification", () => {
	beforeEach(() => {
		carsRepositoryInMemory = new InMemoryCarsRepository();
		createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
			carsRepositoryInMemory
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

		const specifications_id = ["54321"];

		createCarSpecificationUseCase.execute({
			car_id: car.id,
			specifications_id,
		});
	});

	it("should not be able to add a specification from a not existent car", () => {
		expect(() => {
			const car_id = "1234";
			const specifications_id = ["54321"];

			createCarSpecificationUseCase.execute({ car_id, specifications_id });
		}).rejects.toBeInstanceOf(AppError);
	});
});
