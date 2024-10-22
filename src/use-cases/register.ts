import { prisma } from '@/lib/prisma'
import { UsersRespository } from '@/respositories/users-respository'
import { UserAlreadyExistsError } from './erros/user-already-exists'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
    name: string,
    email: string,
    password: string
}

interface RegisterUseCaseResponse{
    user: User
}

export class RegisterUseCase{
    constructor( private userRepository: UsersRespository) {}


    async execute ({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> { 
        const password_hash = await hash(password, 6)
    
        const userWithSameEmail = await this.userRepository.findByemail(email)
        
    
        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }
    
    
        const user = await this.userRepository.create({
            name,
            email,
            password_hash
        })
        return {
            user
        }
    } 
}

