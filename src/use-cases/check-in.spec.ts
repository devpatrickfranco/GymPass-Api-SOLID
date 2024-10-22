import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemorCheckInsRepository } from '@/respositories/in-memory/in-memory-check-ins-respository'
import { InMemorGymsRepository } from '@/respositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberCheckInsError } from './erros/max-number-check-ins-error'
import { MaxDistanceError } from './erros/max-distance-error'

let checkInsRespository: InMemorCheckInsRepository
let gymsRepository: InMemorGymsRepository
let sut: CheckInUseCase


describe('CheckIn Use Case', () => {
    beforeEach( async ()=> {
        checkInsRespository = new InMemorCheckInsRepository()
        gymsRepository = new InMemorGymsRepository()     
        sut = new CheckInUseCase(checkInsRespository, gymsRepository)

           await gymsRepository.create({
            id: 'gym-01',
            title: 'Smart Fit',
            description: '',
            phone: '',
            latitude: -22.8520029,
            longitude: -47.0286336
           })

        vi.useFakeTimers()
   
        afterEach(() => {
            vi.useRealTimers()
        })
        
    })

    // first
    it('should be able to check in', async () => {


        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -22.8520029,
            userLongitude: -47.0286336
        
        })
        
        expect(checkIn.id).toEqual(expect.any(String))
        
    })

        // second
        it('should not be able to check in twice in the same day', async () => {
            vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

            await sut.execute({
                gymId: 'gym-01',
                userId: 'user-01',
                userLatitude: -22.8520029,
                userLongitude: -47.0286336
            })
            
            await expect(() =>  sut.execute({
                gymId: 'gym-01',
                userId: 'user-01',
                userLatitude: -22.8520029,
                userLongitude: -47.0286336
            
            })).rejects.toBeInstanceOf(Error)
            
        })

            // third
            it('should not be able to check in twice but in different days', async () => {
                vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    
                    await sut.execute({
                    gymId: 'gym-01',
                    userId: 'user-01',
                    userLatitude: -22.8520029,
                    userLongitude: -47.0286336
                
                })
                
                vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

                const { checkIn } = await sut.execute({
                    gymId: 'gym-01',
                    userId: 'user-01',
                    userLatitude: -22.8520029,
                    userLongitude: -47.0286336
                
                })

                expect(checkIn.id).toEqual(expect.any(String))
                
            })

            // four
            it('should not be able to check in on distant gym', async () => {

                gymsRepository.items.push({
                    id: 'gym-02',
                    title: 'JavaScript Academy',
                    description: '',
                    phone: '',
                    latitude: new Decimal(-22.8655668),
                    longitude: new Decimal(-47.0519795) // academia
                   })

                await expect(() =>
                  sut.execute({
                    gymId: 'gym-02',
                    userId: 'user-01',
                    userLatitude: -22.8520029, // casa 
                    userLongitude: -47.0286336               
                })).rejects.toBeInstanceOf(MaxDistanceError)
                
                
                
            })
        


})