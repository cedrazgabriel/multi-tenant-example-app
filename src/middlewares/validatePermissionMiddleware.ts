import { FastifyRequest, FastifyReply } from "fastify";
import { db } from "../lib/db";
import { OrganizationRole } from "@prisma/client";

export function validatePermissionMiddleware(requiredRoles?: OrganizationRole[]) {
    return async (request: FastifyRequest, reply: FastifyReply) => {
   try {
    const organizationId = request.headers["x-org-id"]

    if (!organizationId || typeof organizationId !== "string") {
        return reply.status(403).send({
            error: "Organization ID is required",
        })
    }

    const { sub } = request.user

    const organizationUser = await db.organizationUser.findUnique({
        where: {
            userId_organizationId: {
                userId: sub,
                organizationId,
            }
        }
    })

    if (!organizationUser || (requiredRoles && !requiredRoles.includes(organizationUser.role))) {
        return reply.status(403).send({
            error: "You are not allowed to access this resource",
        })
    }

    request.organizationUser = organizationUser

   }
   catch {
    return reply.status(403).send({
        error: "Organization ID is required",
    })
   }
    }
}
