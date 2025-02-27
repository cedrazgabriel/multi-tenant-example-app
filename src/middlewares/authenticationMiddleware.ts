import { FastifyReply, FastifyRequest } from "fastify";


export const authenticationMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify();
    } catch  {
        return reply.status(401).send({
            message: "Invalid access token",
        });
    }
}
