import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewars/verify-jwt";
import { virifyUserRole } from '@/http/middlewars/verify-user-role'

import { create } from "./create";
import { validate } from "./validate";
import { history } from "./history";
import { metrics } from "./metrics";

export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('/check-ins/history', history)
    app.get('/check-ins/metrics', metrics)

    app.post('/gyms/:gymId/check-in', create)
    app.patch('/check-ins/:checkInId/validate', { onRequest:[ virifyUserRole('ADMIN') ] }, validate)

}
