import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findByUserIdOnDate(userId: String, date: Date): Promise<CheckIn | null>
    findManyByUserId(userId: String, page: Number) : Promise <CheckIn[]> 
    countByUserId(userId: string) : Promise<number>
    findById(id: String): Promise<CheckIn | null>
    save(checkIn: CheckIn) : Promise<CheckIn> 
}