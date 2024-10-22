import { InMemorGymsRepository } from '@/respositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let userRepository: InMemorGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
    beforeEach(()=> {
         userRepository = new InMemorGymsRepository()
         sut = new CreateGymUseCase(userRepository)
    })

    // first
    it('should be able to crate gym', async () => {


        const { gym } = await sut.execute({
            title: 'JavaScript Gym',
            description: null, 
            phone: null,
            latitude: -22.8520029,
            longitude: -47.0286336
        })
        
        expect(gym.id).toEqual(expect.any(String))
        
    })
})