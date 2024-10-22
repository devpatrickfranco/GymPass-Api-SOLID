import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewars/verify-jwt";
import { virifyUserRole } from '@/http/middlewars/verify-user-role'

import { search } from "./search";
import { nearby } from "./nearby"
import { create } from "./create";

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('/gyms/search', search)
    app.get('/gyms/nearby', nearby)

    app.post('/gyms', { onRequest: [virifyUserRole('ADMIN')] }, create)
}
