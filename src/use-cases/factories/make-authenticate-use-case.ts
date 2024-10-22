import { PrismaUsersRepository } from "@/respositories/prisma/prisma-user-repository"
import { AuthenticateUseCase } from "../authenticate"

export function makeAuthenticateUseCase() {
    const usersRepository = new PrismaUsersRepository   
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    return authenticateUseCase
}