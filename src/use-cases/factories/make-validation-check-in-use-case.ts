import { PrimaCheckInsRepository } from '@/respositories/prisma/prisma-check-ins-repository'
import { ValidateUseCase } from '../validate-check-in'

export function makeValidateUseCase() {
    const checkInsRepository = new PrimaCheckInsRepository()
    const useCase = new ValidateUseCase(checkInsRepository)

    return useCase
}