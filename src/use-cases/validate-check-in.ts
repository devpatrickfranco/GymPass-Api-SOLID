import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/respositories/checki-ins-respository";
import { RescourceNotFoundError } from "./erros/resource-not-found-error";
import dayjs from "dayjs";
import { LateCheckInvalidationError } from "./erros/late-check-in-validation-error";

interface ValidateUseCaseRequest{
    checkInId: string
}

interface ValidateUseCaseResponse {
   checkIn: CheckIn
}

export class ValidateUseCase {
    constructor(
        private checkInsRespository: CheckInsRepository,

    ) {}

    async execute({ checkInId } : ValidateUseCaseRequest): Promise<ValidateUseCaseResponse>{
        const checkIn = await this.checkInsRespository.findById(checkInId)

        if(!checkIn) {
            throw new RescourceNotFoundError()
        }

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            'minutes'
        )
        
        checkIn.validated_at = new Date()

        if (distanceInMinutesFromCheckInCreation > 20 ) {
            throw new LateCheckInvalidationError()
        }

        await this.checkInsRespository.save(checkIn)

        return {
            checkIn
        }
    }

} 