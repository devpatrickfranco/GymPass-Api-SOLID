import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemorCheckInsRepository } from '@/respositories/in-memory/in-memory-check-ins-respository'
import { ValidateUseCase } from './validate-check-in'
import { RescourceNotFoundError } from './erros/resource-not-found-error'

let checkInsRespository: InMemorCheckInsRepository
let sut: ValidateUseCase


describe('Validate CheckIn Use Case', () => {
    beforeEach( async ()=> {
        checkInsRespository = new InMemorCheckInsRepository()
        sut = new ValidateUseCase(checkInsRespository)

            vi.useFakeTimers()
   
        afterEach(() => {
            vi.useRealTimers()
        })
        
    })

    // first
    it('should be able to validade check-in', async () => {
        const createCheckIn = await checkInsRespository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        const { checkIn } = await sut.execute({
            checkInId: createCheckIn.id
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInsRespository.items[0].validated_at).toEqual(expect.any(Date))
    })

    // second
    it('should not be able to validade an inexistent check-in', async () => {
        await  expect( () => 
            sut.execute({
                checkInId: 'inexistent-check-in-id'
            })
        ).rejects.toBeInstanceOf(RescourceNotFoundError)
    })

    // third ---> ttd
    it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
        vi.setSystemTime(new Date(2024, 0, 1, 13, 40))

        const createCheckIn = await checkInsRespository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        const twentyOneMinutesInMs = 1000 * 60 * 21

        vi.advanceTimersByTime(twentyOneMinutesInMs)

        await expect(() => sut.execute({
            checkInId: createCheckIn.id
        })).rejects.toBeInstanceOf(Error)

    })
})