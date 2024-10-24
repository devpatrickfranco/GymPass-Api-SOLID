import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/respositories/checki-ins-respository";

interface FetchUserCheckInsHistoryUseCaseRequest{
    userId: string
    page: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {
   checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase
 {
    constructor(
        private checkInsRespository: CheckInsRepository,
    ) {}

    async execute({ userId, page } : FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse>{
        const checkIns = await this.checkInsRespository.findManyByUserId(userId, page)

        
        
        return {
            checkIns
        }
    }

} 