import { PrismaGymsRepository } from '@/respositories/prisma/prisma-gyms-repository'
import { SearchymsUseCase } from '../search-gyms'

export function makeSearchGymsUseCase() {
    const checkInsRepository = new PrismaGymsRepository()
    const useCase = new SearchymsUseCase(checkInsRepository)

    return useCase
}