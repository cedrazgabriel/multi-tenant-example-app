import { FastifyReply, FastifyRequest } from "fastify";

import { db } from "../../lib/db";

export class ListLeadsController {
    static async handler(request: FastifyRequest, reply: FastifyReply) {
        const leads = await db.lead.findMany();
        return reply.status(200).send(leads);
    }
}

