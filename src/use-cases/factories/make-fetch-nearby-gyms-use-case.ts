import { PrismaGymsRepository } from '@/respositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymesUseCase() {
    const checkInsRepository = new PrismaGymsRepository()
    const useCase = new FetchNearbyGymsUseCase(checkInsRepository)

    return useCase
}