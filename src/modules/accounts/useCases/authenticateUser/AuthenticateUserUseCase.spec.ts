import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

import { AppError } from "@shared/errors/AppError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		authenticateUserUseCase = new AuthenticateUserUseCase(
			usersRepositoryInMemory
		);
		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
	});

	it("should be able to authenticate an user.", async () => {
		const user: ICreateUserDTO = {
			name: "test user",
			email: "user@test.com",
			password: "1234",
			driver_license: "001234",
		};

		await createUserUseCase.execute(user);

		const result = await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password,
		});

		expect(result).toHaveProperty("token");
	});

	it("should not be able to authenticate an nonexistent user.", () => {
		expect(async () => {
			await authenticateUserUseCase.execute({
				email: "false@email.com",
				password: "1234",
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to authenticate with wrong password.", () => {
		expect(async () => {
			const user: ICreateUserDTO = {
				name: "test user",
				email: "user@test.com",
				password: "1234",
				driver_license: "001234",
			};

			await createUserUseCase.execute(user);

			await authenticateUserUseCase.execute({
				email: user.email,
				password: "99999",
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
