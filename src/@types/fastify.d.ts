import { OrganizationRole } from '@prisma/client'
import 'fastify'

declare module 'fastify' {
    interface FastifyRequest {
        organizationUser: {
            organizationId: string
            userId: string
            role: OrganizationRole
        }
    }
}
