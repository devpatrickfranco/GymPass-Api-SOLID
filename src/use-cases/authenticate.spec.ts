import { expect, describe, it, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/respositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'

let usesrRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
    beforeEach(()=>{
         usesrRepository = new InMemoryUsersRepository()
         sut = new AuthenticateUseCase(usesrRepository)
    })

    // first
    it('should be able to authenticate', async () => {


        await usesrRepository.create({
            name: 'patrick',
            email: 'patrick@email.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            email: 'patrick@email.com',
            password: '123456'
        })
        
        expect(user.id).toEqual(expect.any(String))
        
    })

        // second
        it('should not be able to authenticate with wrong email', async () => {
            
            await expect(() => 
                sut.execute({
                    email: 'patrick@email.com',
                    password: '123456'
                })
            ).rejects.toBeInstanceOf(InvalidCredentialsError)
            
        })

            // third
            it('should not be able to authenticate with wrong password', async () => {

                await usesrRepository.create({
                    name: 'patrick',
                    email: 'patrick@email.com',
                    password_hash: await hash('123456', 6)
                })
                
                await expect(() => 
                    sut.execute({
                        email: 'patrick@email.com',
                        password: '654321'
                    })
                ).rejects.toBeInstanceOf(InvalidCredentialsError)
                
            })
})