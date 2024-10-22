import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/use-cases/utils/test/create-and-authenticate-user";

describe('Nearby Gyms (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })
    
    afterAll( async () => {
        await app.close()
    })
    
    it('should be able to list nearby gyms', async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: 'Javascript Gym',
            description: 'Some Descrption',
            phone: '5519981264446', 
            latitude: -22.8520029,
            longitude: -47.0286336
        })
        
        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: 'TypeScript Gym',
            description: 'Some Descrption',
            phone: '5519981264446', 
            latitude: -23.0065704,
            longitude: -47.1341576
        })


        const response = await request(app.server)
        .get('/gyms/nearby')
        .query({
            latitude: -22.8520029,
            longitude: -47.0286336        
        })
        .set('Authorization', `Bearer ${token}`)
        .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'Javascript Gym'
            })
        ])
    })

})