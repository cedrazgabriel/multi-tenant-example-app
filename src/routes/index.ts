import { SignUpController } from "../controllers/auth/SignUpController";
import { SignInController } from "../controllers/auth/SignInController";

import { FastifyPluginAsync } from "fastify";


export const routes: FastifyPluginAsync = async (fastify) => {
    fastify.post("/auth/signup", SignUpController.handler);
    fastify.post("/auth/signin", SignInController.handler);
}
