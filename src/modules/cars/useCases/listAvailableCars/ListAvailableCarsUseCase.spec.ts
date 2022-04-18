import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: InMemoryCarsRepository;
let listCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {
	beforeEach(() => {
		carsRepositoryInMemory = new InMemoryCarsRepository();
		listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
	});

	it("should be able t list all available cars", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Carro Teste",
			description: "Descrição Carro Teste",
			daily_rate: 140,
			license_plate: "ABC-4567",
			fine_amount: 100,
			brand: "Marca Teste",
			category_id: "category_id",
		});

		const cars = await listCarsUseCase.execute({});

		expect(cars).toEqual([car]);
	});

	it("should be able to list all available cars by name", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Carro Teste 2",
			description: "Descrição Carro Teste 2",
			daily_rate: 140,
			license_plate: "ABC-4567",
			fine_amount: 100,
			brand: "Marca Teste 2",
			category_id: "category_id",
		});

		const cars = await listCarsUseCase.execute({
			brand: "Marca Teste 2",
		});

		expect(cars).toEqual([car]);
	});

	it("should be able to list all available cars by name", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Carro Teste 2",
			description: "Descrição Carro Teste 2",
			daily_rate: 140,
			license_plate: "ABC-4567",
			fine_amount: 100,
			brand: "Marca Teste 2",
			category_id: "category_id",
		});

		const cars = await listCarsUseCase.execute({
			name: "Carro Teste 2",
		});

		expect(cars).toEqual([car]);
	});

	it("should be able to list all available cars by name", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Carro Teste 2",
			description: "Descrição Carro Teste 2",
			daily_rate: 140,
			license_plate: "ABC-4567",
			fine_amount: 100,
			brand: "Marca Teste 2",
			category_id: "category_id",
		});

		const cars = await listCarsUseCase.execute({
			category_id: "category_id",
		});

		expect(cars).toEqual([car]);
	});
});
