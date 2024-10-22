import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/use-cases/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe('Create Check-in (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })
    
    afterAll( async () => {
        await app.close()
    })
    
    it('should be able to create a Check-in ', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const  gym  = await prisma.gym.create({
            data: {
                title: 'javaScript Gym',
                latitude: -22.8520029,
                longitude: -47.0286336
            }
        })

        const response = await request(app.server)
        .post(`/gyms/${gym.id}/check-in`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            latitude: -22.8520029,
            longitude: -47.0286336
        })
        
        expect(response.statusCode).toEqual(201)

    })

})