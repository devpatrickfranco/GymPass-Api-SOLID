import { Gym } from '@prisma/client'
import { GymsRepository } from '@/respositories/gyms-repository'

interface SearchymsUseCaseRequest {
    query: string
    page: number
}

interface SearchymsUseCaseResponse{
    gyms: Gym[]
}

export class SearchymsUseCase{
    constructor( private gymRepository: GymsRepository) {}


    async execute ({ query, page }: SearchymsUseCaseRequest): Promise<SearchymsUseCaseResponse> { 
              const gyms = await this.gymRepository.searchMany(query, page)

        return {
            gyms
        }
    } 
}

