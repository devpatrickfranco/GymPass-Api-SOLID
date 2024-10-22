import { Gym, Prisma } from "@prisma/client";

export interface FindManyNearbyParams {
    latitude: number
    longitude: number
}

export interface GymsRepository {
    findById(userId: String): Promise< Gym | null>
    create(data: Prisma.GymCreateInput) : Promise<Gym>
    searchMany(query: String, page: number) : Promise<Gym[]>
    findManyNearby(params: FindManyNearbyParams) : Promise <Gym[]>
}