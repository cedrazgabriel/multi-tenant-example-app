import { FastifyPluginAsync } from "fastify";
import { SignUpController } from "../controllers/auth/SignUpController";

export const routes: FastifyPluginAsync = async (fastify) => {
    fastify.post("/auth/signup", SignUpController.handler);
}
