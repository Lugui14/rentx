import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
	sub: string;
}

export async function ensureAuthenticate(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Verificar existência do Token
	const authHeader = req.headers.authorization;
	if (!authHeader) throw new AppError("Token is missing.", 401);

	//Desestruturar Token
	const [, token] = authHeader.split(" ");

	//Validação do token
	try {
		const { sub: user_id } = verify(
			token,
			"23cee4b4ff8127db3f4f2bec859d422a"
		) as IPayload;

		const usersRepository = new UsersRepository();
		const user = await usersRepository.findById(user_id);

		if (!user) throw new AppError("User doesn't exists.");

		req.user = {
			id: user_id,
		};

		next();
	} catch {
		throw new AppError("Invalid token.", 401);
	}
}
