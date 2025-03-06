import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { db } from "../../lib/db";

const schema = z.object({
    organizationId: z.string().uuid()
})

export class SwitchOrganizationController {
    static async handler(request: FastifyRequest, reply: FastifyReply) {
        const { organizationId } = schema.parse(request.params);
        const { sub } = request.user;

        const organizationUser = await db.organizationUser.findUnique({
            where: {
                userId_organizationId: {
                    userId: sub,
                    organizationId
                }
            }
        })

        if (!organizationUser) {
            return reply.code(403).send({
                error: "You can't switch to this organization"
            })
        }

        const accessToken = reply.server.jwt.sign({
            sub: organizationUser.userId,
            organizationId: organizationUser.organizationId,
            role: organizationUser.role
        })


        return reply.code(200).send({ accessToken });
    }
}

