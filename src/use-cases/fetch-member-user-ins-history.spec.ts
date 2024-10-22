import { expect, describe, it, beforeEach } from 'vitest'
import { InMemorCheckInsRepository } from '@/respositories/in-memory/in-memory-check-ins-respository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'
import { console } from 'inspector'

let checkInsRespository: InMemorCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase


describe('Fetch check-in History Use Case', () => {
    beforeEach( async ()=> {
        checkInsRespository = new InMemorCheckInsRepository()
        sut = new FetchUserCheckInsHistoryUseCase(checkInsRespository)
    
})

    // first
    it('should be able to fetch check-in history', async () => {
        await checkInsRespository.create({
            gym_id:'gym-01',
            user_id: 'user-01'
        })

        await checkInsRespository.create({
            gym_id:'gym-02',
            user_id: 'user-01'
        })

        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 1
        })
        
        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-01' }),
            expect.objectContaining({ gym_id: 'gym-02' })
        ])
        
    })

        // second
        it('should be able to fetch paginated check-in history' , async () => {
            for(let i = 1; i <= 22; i++ ){
                await checkInsRespository.create({
                    gym_id: `gym-${i}`,
                    user_id: 'user-01'
                })
            }

    
                const { checkIns } = await sut.execute({
                    userId: 'user-01',
                    page: 2
                })

                console.log(checkIns)
                
                expect(checkIns).toHaveLength(2)
                expect(checkIns).toEqual([
                    expect.objectContaining({ gym_id: 'gym-21' }),
                    expect.objectContaining({ gym_id: 'gym-22' })
                ])
            


        })
        


})