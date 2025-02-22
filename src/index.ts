import Fastify from "fastify";

const fastify = Fastify();

fastify.listen({ port: 3001 }).then(() => {
    console.log("Server is running on port 3001");
});
