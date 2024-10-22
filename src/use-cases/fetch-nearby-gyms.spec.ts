import { InMemorGymsRepository } from '@/respositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemorGymsRepository
let sut: FetchNearbyGymsUseCase


describe('Fetch nearby Gyms Use Case', () => {
    beforeEach( async ()=> {
        gymsRepository = new InMemorGymsRepository()
        sut = new FetchNearbyGymsUseCase(gymsRepository)
    
})
    // first
    it('should be able to fetch nearby gyms', async () => {
        await gymsRepository.create({
            title: 'Near Gym',
            description: null, 
            phone: null,
            latitude: -22.8520029,
            longitude: -47.0286336
        })

        await gymsRepository.create({
            title: 'Far Gym',
            description: null, 
            phone: null,
            latitude: -23.0065704,
            longitude: -47.1341576
        })

        const { gyms } = await sut.execute({
            userLatitude: -22.8520029,
            userLongitude: -47.0286336
        })
        
        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Near Gym' })
        ])
        
    })

        
})