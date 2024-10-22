import { expect, describe, it, beforeEach } from 'vitest'
import { InMemorCheckInsRepository } from '@/respositories/in-memory/in-memory-check-ins-respository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRespository: InMemorCheckInsRepository
let sut: GetUserMetricsUseCase


describe('get user metrics Use Case', () => {
    beforeEach( async ()=> {
        checkInsRespository = new InMemorCheckInsRepository()
        sut = new GetUserMetricsUseCase(checkInsRespository)
    
})

    // first
    it('should be able to get check-ins count from metrics', async () => {
        await checkInsRespository.create({
            gym_id:'gym-01',
            user_id: 'user-01'
        })

        await checkInsRespository.create({
            gym_id:'gym-02',
            user_id: 'user-01'
        })

        const { checkInsCount } = await sut.execute({
            userId: 'user-01',
        })
        
        expect(checkInsCount).toEqual(2)
    })

})