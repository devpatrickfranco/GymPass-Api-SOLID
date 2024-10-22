import { UsersRespository } from "@/respositories/users-respository";
import { User } from "@prisma/client";
import { RescourceNotFoundError } from './erros/resource-not-found-error'

interface GetUserProfileUseCaseRequest{
    userId: string
}

interface GetUserProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {
    constructor(
        private  usersRepository: UsersRespository
    ) {}

    async execute({userId} : GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse>{
        const user = await this.usersRepository.findById(userId)

        if(!user){
            throw new RescourceNotFoundError() 
        }
    
        return {
            user
        }
    }

} 