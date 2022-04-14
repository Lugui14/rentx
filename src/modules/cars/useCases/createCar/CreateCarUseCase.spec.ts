import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: InMemoryCarsRepository;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
	beforeEach(() => {
		carsRepositoryInMemory = new InMemoryCarsRepository();
		createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
	});

	it("should be able to create a new car", async () => {
		const car = await createCarUseCase.execute({
			name: "Car Name",
			description: "Car Description",
			daily_rate: 100,
			license_plate: "abc-123",
			fine_amount: 60,
			brand: "toyota",
			category_id: "category",
		});

		expect(car).toHaveProperty("id");
	});

	it("should not be able to create a car with same license plate", () => {
		expect(async () => {
			await createCarUseCase.execute({
				name: "Car1",
				description: "Car Description",
				daily_rate: 100,
				license_plate: "abc-123",
				fine_amount: 60,
				brand: "toyota",
				category_id: "category",
			});

			await createCarUseCase.execute({
				name: "Car2",
				description: "Car Description",
				daily_rate: 100,
				license_plate: "abc-123",
				fine_amount: 60,
				brand: "toyota",
				category_id: "category",
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should be able to create a car with default available true", async () => {
		const car = await createCarUseCase.execute({
			name: "Car Name",
			description: "Car Description",
			daily_rate: 100,
			license_plate: "abc-123",
			fine_amount: 60,
			brand: "toyota",
			category_id: "category",
		});

		expect(car.available).toBe(true);
	});
});
