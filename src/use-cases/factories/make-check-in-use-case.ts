import { PrimaCheckInsRepository } from '@/respositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/respositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in'

export function makeCheckInUseCase() {
    const checkInsRepository = new PrimaCheckInsRepository()
    const gymsRepository = new PrismaGymsRepository
    const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

    return useCase
}