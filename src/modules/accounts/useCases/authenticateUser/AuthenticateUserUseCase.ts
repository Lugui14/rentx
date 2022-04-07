import "reflect-metadata";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: {
		name: string;
		email: string;
	};
	token: string;
}

@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}

	async execute({ email, password }: IRequest): Promise<IResponse> {
		//Usuário existe
		const user = await this.usersRepository.findByEmail(email);
		if (!user) throw new AppError("Email or password incorrect.");

		//Senha está correta?
		const passwordMatch = await compare(password, user.password);
		if (!passwordMatch) throw new AppError("Email or password incorrect.");

		// -> JSONWEBTOKEN
		const token = sign({}, "23cee4b4ff8127db3f4f2bec859d422a", {
			subject: user.id,
			expiresIn: "1d",
		});

		const tokenReturn: IResponse = {
			token,
			user: {
				name: user.name,
				email: user.email,
			},
		};

		return tokenReturn;
	}
}

export { AuthenticateUserUseCase };
