import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/respositories/checki-ins-respository";
import { GymsRepository } from "@/respositories/gyms-repository";
import { RescourceNotFoundError } from "./erros/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "./utils/get-distance-between-coordinates";
import { MaxDistanceError } from "./erros/max-distance-error";

interface CheckInUseCaseRequest{
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckInUseCaseResponse {
   checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(
        private checkInsRespository: CheckInsRepository,
        private gymsRepository: GymsRepository
    ) {}

    async execute({userId, gymId, userLatitude, userLongitude} : CheckInUseCaseRequest): Promise<CheckInUseCaseResponse>{
        const gym = await this.gymsRepository.findById(gymId)

        if(!gym) {
            throw new RescourceNotFoundError()
        }

        const distance = getDistanceBetweenCoordinates(
            { latidute:userLatitude, longitude: userLongitude },
            { latidute: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new MaxDistanceError()
        }


        const checkInOnSameDay = await this.checkInsRespository.findByUserIdOnDate(
            userId,
            new Date()
        )
        if(checkInOnSameDay) {
            throw new MaxDistanceError()
        }
    
        const checkIn = await this.checkInsRespository.create({
            gym_id: gymId,
            user_id: userId
        })
        
        return {
            checkIn
        }
    }

} 