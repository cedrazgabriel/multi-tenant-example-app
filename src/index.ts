import { routes } from "./routes";

import Fastify from "fastify";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";

const fastify = Fastify();

fastify.register(routes);
fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET!,
    sign: {
        expiresIn: "1h",
    }
})

fastify.setErrorHandler(async (error, request, reply) => {

    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: "Validation error",
            errors: error.issues.map((issue) => ({
                path: issue.path.join("."),
                message: issue.message,
            })),
        });
    }

    console.error(error);
    return reply.status(500).send({
        message: "Internal server error",
    });
});

fastify.listen({ port: 3001 }).then(() => {
    console.log("Server is running on port 3001");
});
