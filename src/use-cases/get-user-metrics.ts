import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/respositories/checki-ins-respository";

interface GetUserMetricsUseCaseRequest{
    userId: string
}

interface GetUserMetricsUseCaseResponse {
   checkInsCount: number
}

export class GetUserMetricsUseCase

 {
    constructor(
        private checkInsRespository: CheckInsRepository,
    ) {}

    async execute({ userId } : GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse>{
        const checkInsCount = await this.checkInsRespository.countByUserId(userId)

        
        
        return {
            checkInsCount
        }
    }

} 