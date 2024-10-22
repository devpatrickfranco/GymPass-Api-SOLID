import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { UsersRespository } from "../users-respository"

export class PrismaUsersRepository implements UsersRespository {
    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        return user
    }
    async findByemail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    }
    async create(data: Prisma.UserCreateInput){
        const user = await prisma.user.create({
            data
        })
    
        return user
    } 
}
