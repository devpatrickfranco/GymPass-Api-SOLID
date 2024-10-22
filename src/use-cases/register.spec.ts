import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/respositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './erros/user-already-exists'

let userRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
    beforeEach(()=> {
         userRepository = new InMemoryUsersRepository()
         sut = new RegisterUseCase(userRepository)
    })

    // first
    it('should hash user password upon registration', async () => {


        const { user } = await sut.execute({
            name: 'jhon,',
            email: 'jhon@jhon.com',
            password: '123456'
        })
        
        const isPasswordCorrectlyHashed = await compare(
        '123456',
        user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
        
    })
    // second
    it('should not be able to register with email twice ', async () => {
        
        const email = 'patrickfranco233302333@example.com'
    
         await sut.execute({
            name: 'jhon Doe',
            email,
            password: '123456'
        })
                
        await expect(() => 
            sut.execute({
                name: 'jhon,',
                email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })

    // third
    it('should be able to register', async () => {
    
        const { user } = await sut.execute({
            name: 'jhon,',
            email: 'jhon@jhon.com',
            password: '123456'
        })
        


        expect(user.id).toEqual(expect.any(String))
        
    })
})