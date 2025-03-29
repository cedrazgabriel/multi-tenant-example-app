import { FastifyPluginAsync } from "fastify";

import { ListLeadsController } from "../controllers/leads/ListLeadsController";
import { validatePermissionMiddleware } from "../middlewares/validatePermissionMiddleware";
import { CreateLeadController } from "../controllers/leads/CreateLeadController";

export const leadsRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.addHook("onRequest", validatePermissionMiddleware());

    fastify.get("/", ListLeadsController.handler);
    fastify.post(
        "/",
        {
            onRequest: [validatePermissionMiddleware(['ADMIN', 'OWNER'])],
        },
         CreateLeadController.handler);
}
