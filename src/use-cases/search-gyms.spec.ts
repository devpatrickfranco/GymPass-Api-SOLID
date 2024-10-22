import { InMemorGymsRepository } from '@/respositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchymsUseCase } from './search-gyms'
import { title } from 'process'


let gymsRepository: InMemorGymsRepository
let sut: SearchymsUseCase


describe('Search Gyms Use Case', () => {
    beforeEach( async ()=> {
        gymsRepository = new InMemorGymsRepository()
        sut = new SearchymsUseCase(gymsRepository)
    
})

    // first
    it('should be able to search for gyms', async () => {
        await gymsRepository.create({
            title: 'JavaScript Gym',
            description: null, 
            phone: null,
            latitude: -22.8520029,
            longitude: -47.0286336
        })

        await gymsRepository.create({
            title: 'TypeScript Gym',
            description: null, 
            phone: null,
            latitude: -22.8520029,
            longitude: -47.0286336
        })

        const { gyms } = await sut.execute({
            query: 'JavaScript', 
            page: 1
        })
        
        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JavaScript Gym' })
        ])
        
    })

        // second
        it('should be able to fetch paginated gyms search' , async () => {
            for(let i = 1; i <= 22; i++ ){
                await gymsRepository.create({
                    title: `JavaScript Gym ${i}`,
                    description: null, 
                    phone: null,
                    latitude: -22.8520029,
                    longitude: -47.0286336
                })
            }
    
                const { gyms } = await sut.execute({
                    query: 'JavaScript',
                    page: 2
                })

                expect(gyms).toHaveLength(2)
                expect(gyms).toEqual([
                    expect.objectContaining({title: 'JavaScript Gym 21' }),
                    expect.objectContaining({title: 'JavaScript Gym 22' })
                ])
        })
})