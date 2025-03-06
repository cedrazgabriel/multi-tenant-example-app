import '@fastify/jwt'
import { OrganizationRole } from '@prisma/client';

declare module "@fastify/jwt" {
    type Payload = { sub: string, organizationId: string, role: OrganizationRole };

    interface FastifyJWT {
        payload: Payload;
        user: Payload;
    }
}
