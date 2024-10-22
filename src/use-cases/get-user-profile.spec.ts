import { expect, describe, it, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/respositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'
import { GetUserProfileUseCase } from './get-user-profile'
import { RescourceNotFoundError } from './erros/resource-not-found-error'

let usesrRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(()=>{
         usesrRepository = new InMemoryUsersRepository()
         sut = new GetUserProfileUseCase(usesrRepository)
    })

    // first
    it('should be able to get user profile', async () => {
        const createdUser = await usesrRepository.create({
            name: 'patrick',
            email: 'patrick@email.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            userId: createdUser.id
        })
        
        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual('patrick')

        
    })

        // second
        it('should not be able to get user profile with wrong id', async () => {
            
            await expect(() => 
                sut.execute({
                userId: 'not-existing-id'    
                
                })
            ).rejects.toBeInstanceOf(RescourceNotFoundError)
            
        })
})