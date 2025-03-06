import { FastifyReply, FastifyRequest } from "fastify";

import { db } from "../../lib/db";

export class ListLeadsController {
    static async handler(request: FastifyRequest, reply: FastifyReply) {
        const { organizationId } = request.user;

        const leads = await db.lead.findMany({
            where: {
                organizationId
            }
        });
        return reply.status(200).send(leads);
    }
}

