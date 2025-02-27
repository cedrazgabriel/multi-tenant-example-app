import { FastifyPluginAsync } from "fastify";

import { ListLeadsController } from "../controllers/leads/ListLeadsController";

export const leadsRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get("/", ListLeadsController.handler);
}
