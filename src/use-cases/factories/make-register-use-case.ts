import { PrismaUsersRepository } from "@/respositories/prisma/prisma-user-repository"
import { RegisterUseCase } from "../register"

export function makeRegisterUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository   
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    return registerUseCase
}