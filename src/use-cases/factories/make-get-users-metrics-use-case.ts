import { PrimaCheckInsRepository } from '@/respositories/prisma/prisma-check-ins-repository'
import { GetUserMetricsUseCase } from "../get-user-metrics"

export function makeGetUserMetricsUseCase() {
    const checkInsRepository = new PrimaCheckInsRepository()
    const useCase = new GetUserMetricsUseCase(checkInsRepository)

    return useCase
}