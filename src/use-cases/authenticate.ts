import { UsersRespository } from "@/respositories/users-respository";
import { InvalidCredentialsError } from "./erros/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest{
    email: string
    password: string
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(
        private  usersRepository: UsersRespository
    ) {}

    async execute({email, password} : AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse>{
        const user = await this.usersRepository.findByemail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }
    
        const doesPasswordMatches = await compare(password, user.password_hash)

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }
    
        return {
            user
        }
    }

} 