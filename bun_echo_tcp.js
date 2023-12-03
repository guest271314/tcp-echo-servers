#!/usr/bin/env -S ./bun run
const encoder = new TextEncoder();
const decoder = new TextDecoder();

const server = Bun.listen({
  hostname: "localhost",
  port: 8000,
  socket: {
    data(socket, data) {
      const response = decoder.decode(data);
      socket.write(encoder.encode(response));
    },
    open(socket) {
      console.log("Socket open.");
    },
    close(socket) {
      console.log("Socket closed.");
      server.stop(true);
      server.unref();
      process.exit();
    },
    drain(socket) {
      console.log("drain");
    },
    error(socket, error) {
      console.log(error);
    },
  },
  /*
  tls: {
    // can be string, BunFile, TypedArray, Buffer, or array thereof
    key: Bun.file("./key.pem"),
    cert: Bun.file("./cert.pem"),
  },
  */
});

const { hostname, port } = server;

console.log(`Listening on hostname: ${hostname}, port: ${port}`);
