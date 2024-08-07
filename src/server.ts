import fastify from "fastify";

const server = fastify();

server.get("/hello", () => {
  return "Hello World, watch";
});

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP Server is running on port 3333");
  });
