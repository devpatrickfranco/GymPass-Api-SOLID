import { Prisma, User } from "@prisma/client"

export interface UsersRespository{
    findById(id: String): Promise<User | null>
    findByemail(email: string): Promise<User | null> 
    create(data: Prisma.UserCreateInput): Promise<User>
}