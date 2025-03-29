import { FastifyReply, FastifyRequest } from "fastify";

import { db } from "../../lib/db";

export class ListLeadsController {
    static async handler(request: FastifyRequest, reply: FastifyReply) {

        const { organizationId }  = request.organizationUser

        if (!organizationId || typeof organizationId !== "string") {
            return reply.status(403).send({
                error: "Organization ID is required",
            })
        }

        const leads = await db.lead.findMany({
            where: {
                organizationId
            }
        });
        return reply.status(200).send(leads);
    }
}

